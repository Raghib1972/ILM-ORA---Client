"use client";
/**
 * Super Admin > Landing Pages > Workshops Management
 * Public page (Ilmora-workshops.jsx) ke har section ka CMS: edit, order, visibility, media, SEO, draft / preview / publish / versions.
 * Workshop records yahan duplicate nahi hote: Featured Programs hi source of truth hai (sirf slug se reference).
 *
 * Route: /superadmin/workshops-management  (src/SuperAdmin/routes mein add karo; sidebar mein Landing Pages ke neeche)
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './workshops-management.css';
import { cmsApi, CMS_MOCK } from './cmsApi';
import { SECTIONS, GROUPS, SEO_FIELDS, getSection, seedContent } from './sectionSchemas';
import { Field } from './FieldEditors';
import MediaLibrary from './MediaLibrary';

const PUBLIC_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_WORKSHOPS_PUBLIC_URL) || '/Ilmora-workshops';
const FP_ADMIN_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_FEATURED_PROGRAMS_ADMIN_URL) || '/superadmin/featured-programs';
const clone = (o) => JSON.parse(JSON.stringify(o));
const ts = (t) => (t ? new Date(t).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'Never');

/** Backend / purane draft mein naye sections na hon to seed se bhar do. */
function normalize(c) {
  const base = seedContent();
  const out = { order: [], sections: {}, seo: { ...base.seo, ...((c && c.seo) || {}) } };
  SECTIONS.forEach((s) => { const cur = c && c.sections && c.sections[s.id]; out.sections[s.id] = cur ? { enabled: cur.enabled !== false, data: { ...clone(s.seed), ...(cur.data || {}) } } : base.sections[s.id]; });
  const ord = ((c && c.order) || []).filter((id) => out.sections[id]);
  out.order = [...ord, ...base.order.filter((id) => !ord.includes(id))];
  return out;
}

function validate(c, programs) {
  const errors = [], warnings = [];
  const S = (id) => c.sections[id];
  const on = (id) => S(id) && S(id).enabled;
  if (on('hero') && !(S('hero').data.headline || '').trim()) errors.push('Hero: headline is required.');
  if (on('whyNow') && (S('whyNow').data.items || []).length && !(S('whyNow').data.source || '').trim()) errors.push('Why now: statistics need a cited source.');
  if (on('faq')) (S('faq').data.items || []).filter((x) => x.visible !== false).forEach((x, i) => { if (!x.question.trim() || !x.answer.trim()) errors.push(`FAQ #${i + 1}: question and answer are both required.`); });
  if (on('mentors')) (S('mentors').data.items || []).filter((x) => x.active !== false).forEach((x, i) => { if (!x.name.trim()) errors.push(`Mentor #${i + 1}: name is required.`); });
  if (on('wallOfLove')) (S('wallOfLove').data.items || []).forEach((x, i) => { if (x.visible !== false && !x.text.trim() && !x.youtube.trim()) errors.push(`Testimonial #${i + 1}: add feedback text or a video.`); if (x.rating && (x.rating < 1 || x.rating > 5)) errors.push(`Testimonial #${i + 1}: rating must be 1 to 5.`); });
  const o = S('offer').data; if (on('offer') && Number(o.price) > Number(o.original) && Number(o.original) > 0) warnings.push('Offer: offer price is higher than the original price.');
  if (on('offer') && o.registerSlug && programs.list.length && !programs.list.some((p) => p.slug === o.registerSlug)) warnings.push(`Offer: "${o.registerSlug}" was not found in Featured Programs.`);
  const unverified = on('wallOfLove') ? (S('wallOfLove').data.items || []).filter((x) => x.visible !== false && !x.verified).length : 0;
  if (unverified) warnings.push(`${unverified} testimonial(s) are not marked verified. They are labelled "Sample" on the public page.${CMS_MOCK ? '' : ' Remove or verify them before going live.'}`);
  if (!c.seo.title.trim()) warnings.push('SEO: page title is empty.');
  return { errors, warnings };
}

export default function WorkshopsManagement() {
  const [boot, setBoot] = useState({ loading: true, error: null });
  const [content, setContent] = useState(null);
  const [saved, setSaved] = useState('');
  const [published, setPublished] = useState(null);
  const [meta, setMeta] = useState({});
  const [tab, setTab] = useState('sections');
  const [sel, setSel] = useState('hero');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState('');
  const [toasts, setToasts] = useState([]);
  const [modal, setModal] = useState(null); // {type:'publish'|'preview'|'picker'|'confirm', ...}
  const [programs, setPrograms] = useState({ list: [], loading: true, error: '' });
  const [media, setMedia] = useState({ list: [], loading: true, error: '' });
  const [versions, setVersions] = useState({ list: [], loading: true, error: '' });
  const dragFrom = useRef(null);

  const toast = useCallback((msg, kind = '') => { const id = Date.now() + Math.random(); setToasts((t) => [...t, { id, msg, kind }]); setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500); }, []);

  const loadPrograms = useCallback(() => { setPrograms((p) => ({ ...p, loading: true, error: '' })); cmsApi.listPrograms().then((list) => setPrograms({ list, loading: false, error: '' })).catch((e) => setPrograms({ list: [], loading: false, error: e.message })); }, []);
  const loadMedia = useCallback(() => { setMedia((m) => ({ ...m, loading: true, error: '' })); cmsApi.listMedia().then((list) => setMedia({ list, loading: false, error: '' })).catch((e) => setMedia({ list: [], loading: false, error: e.message })); }, []);
  const loadVersions = useCallback(() => { setVersions((v) => ({ ...v, loading: true, error: '' })); cmsApi.listVersions().then((list) => setVersions({ list, loading: false, error: '' })).catch((e) => setVersions({ list: [], loading: false, error: e.message })); }, []);

  const load = useCallback(async () => {
    setBoot({ loading: true, error: null });
    try {
      const d = await cmsApi.getDraft();
      const c = normalize(d.content);
      setContent(c); setSaved(JSON.stringify(c)); setMeta(d.meta || {});
      cmsApi.getPublished().then((p) => setPublished(p ? normalize(p) : null)).catch(() => setPublished(null));
      setBoot({ loading: false, error: null });
    } catch (e) { setBoot({ loading: false, error: e }); }
    loadPrograms(); loadMedia(); loadVersions();
  }, [loadPrograms, loadMedia, loadVersions]);
  useEffect(() => { load(); }, [load]);

  const dirty = content && JSON.stringify(content) !== saved;
  useEffect(() => {
    if (!dirty) return undefined;
    const h = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', h); return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const pickMedia = useCallback((kind) => new Promise((resolve) => setModal({ type: 'picker', kind, resolve })), []);
  const ctx = useMemo(() => ({ programs, reloadPrograms: loadPrograms, pickMedia, toast, refreshMedia: loadMedia }), [programs, loadPrograms, pickMedia, toast, loadMedia]);

  const setSection = (id, patch) => setContent((c) => ({ ...c, sections: { ...c.sections, [id]: { ...c.sections[id], ...patch } } }));
  const setData = (id, key, value) => setContent((c) => ({ ...c, sections: { ...c.sections, [id]: { ...c.sections[id], data: { ...c.sections[id].data, [key]: value } } } }));
  const setSeo = (key, value) => setContent((c) => ({ ...c, seo: { ...c.seo, [key]: value } }));
  const moveSection = (from, to) => { if (to < 0 || to >= content.order.length || from === to) return; const o = [...content.order]; const [x] = o.splice(from, 1); o.splice(to, 0, x); setContent({ ...content, order: o }); };

  const saveDraft = async (silent) => {
    setBusy('save');
    try { const m = await cmsApi.saveDraft(content); setSaved(JSON.stringify(content)); setMeta((x) => ({ ...x, ...(m || {}), lastUpdated: Date.now() })); if (!silent) toast('Draft saved. The public page is unchanged until you publish.', 'ok'); return true; }
    catch (e) { toast(e.message, 'bad'); return false; } finally { setBusy(''); }
  };
  const openPreview = async () => { if (dirty && !(await saveDraft(true))) return; setModal({ type: 'preview', device: 'desktop' }); };
  const doPublish = async (note) => {
    setBusy('publish');
    try {
      const m = await cmsApi.publish(content, note);
      setSaved(JSON.stringify(content)); setPublished(clone(content)); setMeta((x) => ({ ...x, ...(m || {}), lastPublished: Date.now(), lastUpdated: Date.now() }));
      loadVersions(); setModal(null); toast('Published. The public Workshops page now shows these changes.', 'ok');
    } catch (e) { toast(e.message, 'bad'); } finally { setBusy(''); }
  };
  const revertToPublished = () => setModal({ type: 'confirm', title: 'Revert draft to the published version?', text: 'All unpublished draft changes will be lost.', ok: 'Revert draft', run: async () => {
    try { const p = published || (await cmsApi.getPublished()); if (!p) { toast('Nothing has been published yet.', 'bad'); return; } setContent(normalize(p)); toast('Draft reverted. Save draft to keep it.', 'ok'); } catch (e) { toast(e.message, 'bad'); }
  } });
  const restore = (v) => setModal({ type: 'confirm', title: `Restore version from ${ts(v.at)}?`, text: 'It is loaded into your draft. The public page changes only after you publish.', ok: 'Restore to draft', run: async () => {
    try { const c = normalize(await cmsApi.restoreVersion(v.id)); setContent(c); setTab('sections'); toast('Version restored into draft. Review, then publish.', 'ok'); } catch (e) { toast(e.message, 'bad'); }
  } });
  const resetSection = (id) => setModal({ type: 'confirm', title: `Reset "${getSection(id).name}" to default content?`, text: 'Your edits in this section will be replaced by the original sample content.', ok: 'Reset', run: async () => setSection(id, { data: clone(getSection(id).seed) }) });

  if (boot.loading) return <div className="wm"><div className="wm-skel" style={{ height: 90 }} /><div className="wm-skel" style={{ height: 380, marginTop: 12 }} /></div>;
  if (boot.error) return <div className="wm"><div className="wm-state" role="alert"><h2>Could not load Workshops Management</h2><p>{boot.error.message}</p>{boot.error.code === 'CONFIG' && <p className="wm-help">Real mode needs the NEXT_PUBLIC_WCMS_* endpoint variables. Set NEXT_PUBLIC_WORKSHOPS_CMS_USE_MOCK=true to try demo mode.</p>}<button type="button" className="wm-btn primary" onClick={load}>Try again</button></div></div>;

  const { errors, warnings } = validate(content, programs);
  const active = content.order.filter((id) => content.sections[id].enabled).length;
  const changed = (id) => !published || JSON.stringify(published.sections[id]) !== JSON.stringify(content.sections[id]) || published.order.indexOf(id) !== content.order.indexOf(id);
  const draftCount = content.order.filter(changed).length;
  const count = (id, key, pred = () => true) => (content.sections[id].data[key] || []).filter(pred).length;
  const stats = [
    ['Total sections', content.order.length, 'a'], ['Active', active, 'b'], ['Hidden', content.order.length - active, 'c'],
    ['Published', published ? content.order.length - draftCount : 0, 'd'], ['Draft changes', draftCount, 'e'],
    ['Workshops', programs.error ? 'n/a' : programs.list.length, 'a'], ['Mentors', count('mentors', 'items', (m) => m.active !== false), 'b'], ['Testimonials', count('wallOfLove', 'items', (m) => m.visible !== false), 'c'],
  ];
  const list = content.order.filter((id) => !q || getSection(id).name.toLowerCase().includes(q.toLowerCase()));
  const section = getSection(sel);
  const sd = content.sections[sel];

  return (
    <div className="wm">
      <header className="wm-head">
        <div>
          <nav className="wm-crumbs" aria-label="Breadcrumb">Landing Pages / <b>Workshops Management</b></nav>
          <h1>Workshops Management <span className={`wm-badge ${CMS_MOCK ? 'amber' : 'green'}`}>{CMS_MOCK ? 'Demo mode: sample data' : 'Live data'}</span></h1>
          <p className="wm-help">Control every section of the public Workshops page. Changes stay private until you publish.</p>
        </div>
        <div className="wm-actions">
          <span className={`wm-badge ${dirty ? 'amber' : 'green'}`}>{dirty ? 'Unsaved changes' : draftCount ? `${draftCount} unpublished` : 'Up to date'}</span>
          <button type="button" className="wm-btn" onClick={openPreview} disabled={Boolean(busy)}>Preview</button>
          <button type="button" className="wm-btn" onClick={() => saveDraft()} disabled={!dirty || Boolean(busy)}>{busy === 'save' ? 'Saving...' : 'Save draft'}</button>
          <button type="button" className="wm-btn primary" onClick={() => setModal({ type: 'publish' })} disabled={Boolean(busy)}>Publish</button>
        </div>
      </header>

      <div className="wm-stats" aria-label="Overview">
        {stats.map(([l, v, c]) => <div key={l} className={`wm-stat c-${c}`}><b>{v}</b><span>{l}</span></div>)}
        <div className="wm-stat wide"><span>Last updated</span><b>{ts(meta.lastUpdated)}{meta.lastEditor ? ` by ${meta.lastEditor}` : ''}</b><span>Last published</span><b>{ts(meta.lastPublished)}</b></div>
      </div>

      <div className="wm-tabs" role="tablist" aria-label="Workshops management">
        {[['sections', 'Sections'], ['workshops', 'Workshops'], ['media', 'Media'], ['seo', 'SEO'], ['versions', 'Versions']].map(([k, l]) => <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}
      </div>

      {tab === 'sections' && (
        <div className="wm-split">
          <aside className="wm-side" aria-label="Sections">
            <input className="wm-in" placeholder="Search sections" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search sections" />
            <p className="wm-help">Drag to reorder. Order and visibility apply to the public page.</p>
            <ul className="wm-sl">
              {list.map((id) => {
                const s = getSection(id); const on = content.sections[id].enabled; const idx = content.order.indexOf(id);
                return (
                  <li key={id} className={`${sel === id ? 'on' : ''} ${on ? '' : 'off'}`} draggable onDragStart={() => { dragFrom.current = idx; }} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (dragFrom.current != null) moveSection(dragFrom.current, idx); dragFrom.current = null; }}>
                    <span className="wm-grip" aria-hidden="true">::</span>
                    <button type="button" className="wm-sn" onClick={() => setSel(id)}>{s.name}{changed(id) && <i className="wm-dot" title="Unpublished changes" />}<small>{s.group}</small></button>
                    <span className="wm-row">
                      <button type="button" className="wm-ic" aria-label={`Move ${s.name} up`} disabled={idx === 0} onClick={() => moveSection(idx, idx - 1)}>^</button>
                      <button type="button" className="wm-ic" aria-label={`Move ${s.name} down`} disabled={idx === content.order.length - 1} onClick={() => moveSection(idx, idx + 1)}>v</button>
                      <label className="wm-sw sm" title={on ? 'Visible' : 'Hidden'}><input type="checkbox" checked={on} onChange={(e) => setSection(id, { enabled: e.target.checked })} aria-label={`Show ${s.name}`} /><i /></label>
                    </span>
                  </li>
                );
              })}
              {list.length === 0 && <li className="wm-empty">No sections match.</li>}
            </ul>
          </aside>
          <section className="wm-editor" aria-labelledby="ed-h">
            <div className="wm-ed-h">
              <div><h2 id="ed-h">{section.name}</h2><p className="wm-help">{section.desc}</p></div>
              <div className="wm-row">
                <label className="wm-sw"><input type="checkbox" checked={sd.enabled} onChange={(e) => setSection(sel, { enabled: e.target.checked })} /><i /><span>{sd.enabled ? 'Visible' : 'Hidden'}</span></label>
                <button type="button" className="wm-btn sm" onClick={() => resetSection(sel)}>Reset to default</button>
              </div>
            </div>
            {!sd.enabled && <div className="wm-note">This section is hidden. Content is kept but will not appear on the public page.</div>}
            {sel === 'workshops' && <div className="wm-note">Workshop records come from Featured Programs. <a href={FP_ADMIN_URL}>Manage programs</a>. Only references (slugs) are stored here.</div>}
            <p className="wm-help">Empty fields fall back to the public page's built-in default (existing ILM ORA assets and text).</p>
            <div className="wm-fields">
              {section.fields.map((f) => <Field key={`${sel}-${f.key}`} field={f} value={sd.data[f.key]} onChange={(v) => setData(sel, f.key, v)} ctx={ctx} />)}
            </div>
          </section>
        </div>
      )}

      {tab === 'workshops' && (
        <div className="wm-card">
          <div className="wm-ed-h">
            <div><h2>Featured Programs sync</h2><p className="wm-help">All published and active Featured Programs appear on the public page automatically. This list is read-only; there is no second workshop database.</p></div>
            <div className="wm-row"><button type="button" className="wm-btn sm" onClick={loadPrograms}>Refresh</button><a className="wm-btn sm primary" href={FP_ADMIN_URL}>Open Featured Programs</a><button type="button" className="wm-btn sm" onClick={() => { setSel('workshops'); setTab('sections'); }}>Collection settings</button></div>
          </div>
          {programs.error && <div className="wm-err" role="alert">Could not load Featured Programs: {programs.error} <button type="button" className="wm-link" onClick={loadPrograms}>Retry</button></div>}
          {programs.loading && <div className="wm-empty">Loading programs...</div>}
          {!programs.loading && !programs.error && (
            <div className="wm-tablewrap"><table className="wm-table"><thead><tr><th>Title</th><th>Slug</th><th>Category</th><th>Status</th><th>On public page</th></tr></thead>
              <tbody>{programs.list.map((p) => { const hidden = (content.sections.workshops.data.hiddenSlugs || []).includes(p.slug); const pub = !/inactive|draft|unpublished/i.test(p.status || '') && !hidden; return <tr key={p.slug}><td>{p.title}</td><td><code>{p.slug}</code></td><td>{p.category}</td><td>{p.status}</td><td><span className={`wm-badge ${pub ? 'green' : 'amber'}`}>{hidden ? 'Hidden by CMS' : pub ? 'Visible' : 'Not published'}</span></td></tr>; })}</tbody></table></div>
          )}
          {CMS_MOCK && <p className="wm-help">Demo mode shows 5 sample programs. Real mode reads your existing Featured Programs API.</p>}
        </div>
      )}

      {tab === 'media' && <div className="wm-card"><div className="wm-ed-h"><div><h2>Media library</h2><p className="wm-help">Hero images, banners, thumbnails, mentor and instructor photos, videos, gallery, cinematic images, logos and certificate images.</p></div></div><MediaLibrary state={media} reload={loadMedia} toast={toast} /></div>}

      {tab === 'seo' && (
        <div className="wm-card">
          <div className="wm-ed-h"><div><h2>SEO and sharing</h2><p className="wm-help">Applied to the public Workshops page after publishing. Workshop detail pages keep their own title and structured data.</p></div></div>
          <div className="wm-fields">{SEO_FIELDS.map((f) => <Field key={f.key} field={f} value={content.seo[f.key]} onChange={(v) => setSeo(f.key, v)} ctx={ctx} />)}</div>
          <div className="wm-serp"><small>Search preview</small><b>{content.seo.title || 'Workshops | ILM ORA'}</b><span>{content.seo.canonical || 'https://ilmora.texora.ai/Ilmora-workshops'}</span><p>{content.seo.description || 'No meta description set.'}</p></div>
        </div>
      )}

      {tab === 'versions' && (
        <div className="wm-card">
          <div className="wm-ed-h"><div><h2>Version history</h2><p className="wm-help">Every publish is stored. Restoring loads a version into your draft; nothing goes live until you publish.</p></div><button type="button" className="wm-btn sm" onClick={revertToPublished}>Revert draft to published</button></div>
          {versions.error && <div className="wm-err" role="alert">Could not load versions: {versions.error} <button type="button" className="wm-link" onClick={loadVersions}>Retry</button></div>}
          {versions.loading && <div className="wm-empty">Loading versions...</div>}
          {!versions.loading && !versions.error && versions.list.length === 0 && <div className="wm-empty">No published versions yet.</div>}
          <ul className="wm-vl">{versions.list.map((v, i) => <li key={v.id}><div><b>{ts(v.at)}</b>{i === 0 && <span className="wm-badge green">Live</span>}<small>by {v.editor || 'unknown'}{v.note ? ` \u2022 ${v.note}` : ''}</small></div>{i !== 0 && <button type="button" className="wm-btn sm" onClick={() => restore(v)}>Restore</button>}</li>)}</ul>
        </div>
      )}

      {modal && modal.type === 'publish' && <PublishDialog errors={errors} warnings={warnings} busy={busy === 'publish'} draftCount={draftCount} onClose={() => setModal(null)} onPublish={doPublish} />}
      {modal && modal.type === 'confirm' && <Dialog title={modal.title} onClose={() => setModal(null)} foot={<><button type="button" className="wm-btn" onClick={() => setModal(null)}>Cancel</button><button type="button" className="wm-btn primary" onClick={async () => { await modal.run(); setModal(null); }}>{modal.ok}</button></>}><p>{modal.text}</p></Dialog>}
      {modal && modal.type === 'picker' && <Dialog wide title={`Choose ${modal.kind}`} onClose={() => { modal.resolve(''); setModal(null); }}><MediaLibrary state={media} reload={loadMedia} toast={toast} picker={{ kind: modal.kind }} onPick={(u) => { modal.resolve(u); setModal(null); }} /></Dialog>}
      {modal && modal.type === 'preview' && (
        <Dialog xl title="Preview: latest draft" onClose={() => setModal(null)} foot={<><span className="wm-help">Shows the saved draft, not the live page.</span><a className="wm-btn sm" href={`${PUBLIC_URL}?cms_preview=draft`} target="_blank" rel="noopener noreferrer">Open in new tab</a></>}
          head={<div className="wm-row">{['desktop', 'tablet', 'mobile'].map((d) => <button key={d} type="button" className={`wm-btn sm ${modal.device === d ? 'primary' : ''}`} onClick={() => setModal({ ...modal, device: d })}>{d}</button>)}</div>}>
          <div className="wm-frame"><iframe title="Workshops page draft preview" src={`${PUBLIC_URL}?cms_preview=draft`} style={{ width: modal.device === 'mobile' ? 390 : modal.device === 'tablet' ? 768 : '100%' }} /></div>
        </Dialog>
      )}

      <div className="wm-toasts" role="status" aria-live="polite">{toasts.map((t) => <div key={t.id} className={`wm-toast ${t.kind}`}>{t.msg}</div>)}</div>
    </div>
  );
}

function Dialog({ title, children, foot, head, onClose, wide, xl }) {
  useEffect(() => { const h = (e) => { if (e.key === 'Escape') onClose(); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [onClose]);
  return (
    <div className="wm-ov" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`wm-dlg ${wide ? 'wide' : ''} ${xl ? 'xl' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="wm-dlg-h"><h3>{title}</h3>{head}<button type="button" className="wm-ic" aria-label="Close" onClick={onClose}>x</button></div>
        <div className="wm-dlg-b">{children}</div>
        {foot && <div className="wm-dlg-f">{foot}</div>}
      </div>
    </div>
  );
}

function PublishDialog({ errors, warnings, busy, draftCount, onClose, onPublish }) {
  const [note, setNote] = useState('');
  return (
    <Dialog title="Publish changes" onClose={onClose} foot={<><button type="button" className="wm-btn" onClick={onClose}>Cancel</button><button type="button" className="wm-btn primary" disabled={errors.length > 0 || busy} onClick={() => onPublish(note)}>{busy ? 'Publishing...' : 'Publish now'}</button></>}>
      <p>{draftCount ? `${draftCount} section(s) have changes that are not live yet.` : 'There are no changes compared with the live version.'} Publishing updates the public Workshops page for everyone.</p>
      {errors.length > 0 && <div className="wm-err" role="alert"><b>Fix before publishing:</b><ul>{errors.map((e) => <li key={e}>{e}</li>)}</ul></div>}
      {warnings.length > 0 && <div className="wm-note"><b>Please review:</b><ul>{warnings.map((e) => <li key={e}>{e}</li>)}</ul></div>}
      <label className="wm-label" htmlFor="pn">Version note (optional)</label>
      <input id="pn" className="wm-in" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Updated Nov cohort dates" />
    </Dialog>
  );
}
