import { useMemo, useRef, useState } from 'react';
import { cmsApi, MEDIA_RULES, validateFile } from './cmsApi';

const fmtSize = (b) => (b > 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.max(1, Math.round((b || 0) / 1024))} KB`);

/** Centralised media: upload, replace (alt/URL), delete, preview, validation. picker=true => select mode. */
export default function MediaLibrary({ state, reload, toast, picker, onPick }) {
  const { list, loading, error } = state;
  const [kind, setKind] = useState(picker ? picker.kind : 'all');
  const [q, setQ] = useState('');
  const [alt, setAlt] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const fileRef = useRef(null);
  const replaceRef = useRef(null);
  const [replacing, setReplacing] = useState(null);

  const shown = useMemo(() => list.filter((m) => (kind === 'all' || m.kind === kind) && (!q || `${m.name} ${m.alt}`.toLowerCase().includes(q.toLowerCase()))), [list, kind, q]);

  const upload = async (files) => {
    setMsg('');
    for (const f of files) {
      const k = f.type.startsWith('video') ? 'video' : 'image';
      const bad = validateFile(f, k);
      if (bad) { setMsg(`${f.name}: ${bad}`); continue; }
      setBusy(true);
      try { await cmsApi.uploadMedia(f, k, alt); toast(`${f.name} uploaded.`, 'ok'); } catch (e) { setMsg(`${f.name}: ${e.message}`); }
      setBusy(false);
    }
    setAlt(''); reload();
  };
  const replace = async (f) => {
    if (!f || !replacing) return;
    const k = replacing.kind; const bad = validateFile(f, k);
    if (bad) { setMsg(bad); return; }
    setBusy(true);
    try { const n = await cmsApi.uploadMedia(f, k, replacing.alt); await cmsApi.deleteMedia(replacing.id); toast('Replaced. Update fields that used the old URL.', 'ok'); void n; } catch (e) { setMsg(e.message); }
    setBusy(false); setReplacing(null); reload();
  };
  const saveAlt = async (m, v) => { if (v === m.alt) return; try { await cmsApi.updateMedia(m.id, { alt: v }); toast('Alt text saved.', 'ok'); reload(); } catch (e) { toast(e.message, 'bad'); } };
  const del = async (m) => { if (!window.confirm(`Delete ${m.name}? Pages still using this URL will show the built-in default.`)) return; try { await cmsApi.deleteMedia(m.id); toast('Deleted.', 'ok'); reload(); } catch (e) { toast(e.message, 'bad'); } };

  return (
    <div className="wm-media-lib">
      <div className="wm-toolbar">
        <input className="wm-in" placeholder="Search by name or alt text" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search media" />
        {!picker && <select className="wm-in" value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Filter media type"><option value="all">All</option><option value="image">Images</option><option value="video">Videos</option></select>}
        <input className="wm-in" placeholder="Alt text for next upload" value={alt} onChange={(e) => setAlt(e.target.value)} aria-label="Alt text" />
        <button type="button" className="wm-btn primary" onClick={() => fileRef.current && fileRef.current.click()} disabled={busy}>{busy ? 'Uploading...' : 'Upload'}</button>
        <input ref={fileRef} type="file" hidden multiple accept={[...MEDIA_RULES.image.types, ...MEDIA_RULES.video.types].join(',')} onChange={(e) => { upload([...e.target.files]); e.target.value = ''; }} />
        <input ref={replaceRef} type="file" hidden onChange={(e) => { replace(e.target.files[0]); e.target.value = ''; }} />
      </div>
      <small className="wm-help">Images: {MEDIA_RULES.image.label}. Videos: {MEDIA_RULES.video.label}.</small>
      {msg && <div className="wm-err" role="alert">{msg}</div>}
      {error && <div className="wm-err" role="alert">Could not load media: {error} <button type="button" className="wm-link" onClick={reload}>Retry</button></div>}
      {loading && <div className="wm-empty">Loading media...</div>}
      {!loading && !error && shown.length === 0 && <div className="wm-empty">No media yet. Existing ILM ORA assets are used automatically wherever a field is left empty.</div>}
      <div className="wm-grid">
        {shown.map((m) => (
          <figure className="wm-tile" key={m.id}>
            <button type="button" className="wm-thumb" onClick={() => picker && onPick(m.url)} aria-label={picker ? `Use ${m.name}` : `Preview ${m.name}`} disabled={!picker && false}>
              {m.kind === 'video' ? <video src={m.url} muted preload="metadata" /> : <img src={m.url} alt={m.alt || ''} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
            </button>
            <figcaption>
              <b title={m.name}>{m.name}</b>
              <small>{m.kind} {'\u2022'} {fmtSize(m.size)}</small>
              {!picker && (
                <>
                  <input className="wm-in sm" defaultValue={m.alt} placeholder="Alt text" aria-label={`Alt text for ${m.name}`} onBlur={(e) => saveAlt(m, e.target.value)} />
                  <div className="wm-row">
                    <button type="button" className="wm-btn sm" onClick={() => { navigator.clipboard && navigator.clipboard.writeText(m.url).then(() => toast('URL copied.', 'ok')); }}>Copy URL</button>
                    <button type="button" className="wm-btn sm" onClick={() => { setReplacing(m); setTimeout(() => replaceRef.current && replaceRef.current.click(), 0); }}>Replace</button>
                    <button type="button" className="wm-btn sm danger" onClick={() => del(m)}>Delete</button>
                  </div>
                </>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
