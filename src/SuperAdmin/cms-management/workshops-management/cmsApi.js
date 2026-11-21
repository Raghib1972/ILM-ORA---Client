/**
 * Workshops CMS API layer. Components sirf is file se baat karte hain.
 *
 *  Demo mode : localStorage (sirf development / preview). Sample data real nahi hai.
 *  Real mode : backend. Koi endpoint guess nahi kiya gaya: neeche ENDPOINTS env se aate hain.
 *              Khali endpoint par clear "not configured" error aata hai.
 *
 * Auth: abhi localStorage 'token' (Bearer). Apne SuperAdmin ke existing axios / http client se replace karo
 * (src/SuperAdmin/common mein dekho). Authorization (sirf Super Admin) backend par enforce hona zaroori hai.
 */
import { seedContent } from './sectionSchemas';

const ENV = (typeof process !== 'undefined' && process.env) || {};
export const CMS_MOCK = ENV.NEXT_PUBLIC_WORKSHOPS_CMS_USE_MOCK === 'true' ? true
  : ENV.NEXT_PUBLIC_WORKSHOPS_CMS_USE_MOCK === 'false' ? false
  : ENV.NODE_ENV !== 'production';
const BASE = ENV.NEXT_PUBLIC_API_URL || '';

export const ENDPOINTS = {
  draft: ENV.NEXT_PUBLIC_WCMS_DRAFT_PATH || '',                 // GET draft, PUT save draft
  publish: ENV.NEXT_PUBLIC_WCMS_PUBLISH_PATH || '',             // POST publish
  published: ENV.NEXT_PUBLIC_WCMS_PUBLISHED_PATH || '',         // GET published (public page bhi yahi padhta hai)
  versions: ENV.NEXT_PUBLIC_WCMS_VERSIONS_PATH || '',           // GET list; POST {path}/{id}/restore
  media: ENV.NEXT_PUBLIC_WCMS_MEDIA_PATH || '',                 // GET list, POST upload, PATCH/DELETE {path}/{id}
  programs: ENV.NEXT_PUBLIC_FEATURED_PROGRAMS_PATH || '',       // EXISTING Featured Programs list (read-only yahan)
};

export const MEDIA_RULES = {
  image: { types: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'], maxMB: 5, label: 'JPG, PNG, WebP or SVG up to 5 MB' },
  video: { types: ['video/mp4', 'video/webm'], maxMB: 100, label: 'MP4 or WebM up to 100 MB' },
};
export const validateFile = (file, kind) => {
  const r = MEDIA_RULES[kind];
  if (!r) return 'Unknown media type.';
  if (!r.types.includes(file.type)) return `Unsupported format. Use ${r.label}.`;
  if (file.size > r.maxMB * 1048576) return `File is too large. ${r.label}.`;
  return '';
};

const err = (message, code) => Object.assign(new Error(message), { code });
const need = (k) => { if (!ENDPOINTS[k]) throw err(`CMS is not configured: set the endpoint for "${k}" (NEXT_PUBLIC_WCMS_* env). No path is assumed.`, 'CONFIG'); return ENDPOINTS[k]; };
const unwrap = (r) => (r && r.data !== undefined && !Array.isArray(r) ? r.data : r);
const token = () => { try { return window.localStorage.getItem('token'); } catch { return null; } };

async function http(path, opts = {}) {
  const t = token();
  const isForm = typeof FormData !== 'undefined' && opts.body instanceof FormData;
  const res = await fetch(BASE + path, {
    ...opts, credentials: 'include',
    headers: { ...(isForm ? {} : { 'Content-Type': 'application/json' }), ...(t ? { Authorization: `Bearer ${t}` } : {}), ...(opts.headers || {}) },
  });
  if (!res.ok) {
    let msg = 'Request failed. Please try again.';
    try { msg = (await res.json()).message || msg; } catch {}
    if (res.status === 401) msg = 'Your session has expired. Sign in again.';
    if (res.status === 403) msg = 'Only Super Admin can change Workshops content.';
    throw err(msg, res.status);
  }
  return res.status === 204 ? null : res.json();
}

/* ---------------- demo (localStorage) ---------------- */
const mem = {};
const ls = {
  get(k, d) { try { const v = window.localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return k in mem ? mem[k] : d; } },
  set(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { mem[k] = v; if (e && /quota/i.test(String(e.name))) throw err('Browser storage is full (demo mode). Use smaller images.'); } },
};
const K = { draft: 'ilm_wcms_draft', pub: 'ilm_wcms_published', ver: 'ilm_wcms_versions', media: 'ilm_wcms_media', meta: 'ilm_wcms_meta' };
const wait = (ms = 120) => new Promise((r) => setTimeout(r, ms));
const clone = (o) => JSON.parse(JSON.stringify(o));
const editor = () => { try { const u = JSON.parse(window.localStorage.getItem('user') || 'null'); return (u && (u.name || u.email)) || 'Super Admin'; } catch { return 'Super Admin'; } };

const demo = {
  async getDraft() { await wait(); const d = ls.get(K.draft, null) || seedContent(); return { content: d, meta: ls.get(K.meta, {}), hasPublished: Boolean(ls.get(K.pub, null)) }; },
  async saveDraft(content) { await wait(); ls.set(K.draft, content); const m = { ...ls.get(K.meta, {}), lastUpdated: Date.now(), lastEditor: editor() }; ls.set(K.meta, m); return m; },
  async getPublished() { await wait(); return ls.get(K.pub, null); },
  async publish(content, note) {
    await wait(250);
    const versions = ls.get(K.ver, []);
    const v = { id: 'v' + Date.now(), at: Date.now(), editor: editor(), note: note || '', content: clone(content) };
    ls.set(K.ver, [v, ...versions].slice(0, 20));
    ls.set(K.pub, clone(content)); ls.set(K.draft, content);
    const m = { ...ls.get(K.meta, {}), lastUpdated: Date.now(), lastPublished: v.at, lastEditor: v.editor, publishedVersion: v.id };
    ls.set(K.meta, m); return m;
  },
  async listVersions() { await wait(); return ls.get(K.ver, []).map(({ content, ...rest }) => ({ ...rest, sections: Object.keys(content.sections).length })); },
  async restoreVersion(id) { await wait(); const v = ls.get(K.ver, []).find((x) => x.id === id); if (!v) throw err('Version not found', 404); ls.set(K.draft, clone(v.content)); return clone(v.content); },
  async listMedia() { await wait(60); return ls.get(K.media, []); },
  async uploadMedia(file, kind, alt) {
    const bad = validateFile(file, kind); if (bad) throw err(bad);
    if (file.size > 1.5 * 1048576) throw err('Demo mode stores files in the browser: use files under 1.5 MB. Real mode uploads to backend storage.');
    const dataUrl = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(err('Could not read the file.')); r.readAsDataURL(file); });
    const item = { id: 'm' + Date.now(), kind, name: file.name, type: file.type, size: file.size, url: dataUrl, alt: alt || '', at: Date.now() };
    ls.set(K.media, [item, ...ls.get(K.media, [])]); return item;
  },
  async updateMedia(id, patch) { const all = ls.get(K.media, []).map((m) => (m.id === id ? { ...m, ...patch } : m)); ls.set(K.media, all); return all.find((m) => m.id === id); },
  async deleteMedia(id) { ls.set(K.media, ls.get(K.media, []).filter((m) => m.id !== id)); },
  async listPrograms() {
    await wait(60);
    return [['fullstack-nextjs-launchpad', 'Full-stack web apps launchpad', 'Development'], ['ai-agents-from-scratch', 'Build AI agents from scratch', 'AI'], ['prompt-engineering-masterclass', 'Prompt engineering masterclass', 'AI'], ['riak-kv', 'Riak KV', 'Database'], ['scylladb', 'ScyllaDB', 'Database']]
      .map(([slug, title, category]) => ({ slug, title, category, status: 'Active' }));
  },
};

/* ---------------- real backend ---------------- */
const rowsOf = (r) => (Array.isArray(r) ? r : r && (r.data || r.items || r.results || r.programs)) || [];
const real = {
  async getDraft() { const r = unwrap(await http(need('draft'))); return { content: r.content || r, meta: r.meta || { lastUpdated: r.updated_at, lastPublished: r.published_at, lastEditor: r.updated_by }, hasPublished: r.hasPublished ?? true }; },
  async saveDraft(content) { return unwrap(await http(need('draft'), { method: 'PUT', body: JSON.stringify({ content }) })); },
  async getPublished() { const r = unwrap(await http(need('published'))); return r && (r.content || r); },
  async publish(content, note) { return unwrap(await http(need('publish'), { method: 'POST', body: JSON.stringify({ content, note }) })); },
  async listVersions() { return rowsOf(await http(need('versions'))).map((v) => ({ id: v.id || v._id, at: Date.parse(v.created_at || v.at) || v.at, editor: v.editor || v.created_by || '', note: v.note || '', sections: v.sections })); },
  async restoreVersion(id) { const r = unwrap(await http(`${need('versions')}/${encodeURIComponent(id)}/restore`, { method: 'POST' })); return r.content || r; },
  async listMedia() { return rowsOf(await http(need('media'))).map((m) => ({ id: m.id || m._id, kind: m.kind || (String(m.type || m.mime || '').startsWith('video') ? 'video' : 'image'), name: m.name || m.filename, type: m.type || m.mime, size: m.size, url: m.url, alt: m.alt || '', at: Date.parse(m.created_at) || m.at })); },
  async uploadMedia(file, kind, alt) {
    const bad = validateFile(file, kind); if (bad) throw err(bad);
    const fd = new FormData(); fd.append('file', file); fd.append('kind', kind); fd.append('alt', alt || '');
    const m = unwrap(await http(need('media'), { method: 'POST', body: fd }));
    return { id: m.id || m._id, kind, name: m.name || file.name, type: file.type, size: file.size, url: m.url, alt: alt || '', at: Date.now() };
  },
  async updateMedia(id, patch) { return unwrap(await http(`${need('media')}/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(patch) })); },
  async deleteMedia(id) { await http(`${need('media')}/${encodeURIComponent(id)}`, { method: 'DELETE' }); },
  async listPrograms() {
    // Existing Featured Programs API, read-only: koi duplicate workshop record nahi banta.
    const out = []; const path = need('programs');
    for (let p = 1; p <= 50; p++) {
      const r = await http(`${path}${path.includes('?') ? '&' : '?'}page=${p}&limit=100`);
      const rows = rowsOf(r); rows.forEach((x) => out.push({ slug: x.slug || x.course_slug, title: x.title || x.course_title || x.name, category: x.category, status: x.status || (x.is_active === false ? 'Inactive' : 'Active') }));
      if (!rows.length || Array.isArray(r) || !(r.next || (r.meta && p < (r.meta.total_pages || 0)))) break;
    }
    return out.filter((x) => x.slug && x.title);
  },
};

export const cmsApi = new Proxy({}, { get: (_, k) => (CMS_MOCK ? demo : real)[k] });
