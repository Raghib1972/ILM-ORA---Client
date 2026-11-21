import { useRef, useState } from 'react';
import { cmsApi, MEDIA_RULES, validateFile } from './cmsApi';
import { defaultItem } from './sectionSchemas';

const uid = (p) => `${p}-${Math.random().toString(36).slice(2, 8)}`;

/** Image / video field: URL + Upload + Library + preview + missing-media state. */
function MediaField({ field, value, onChange, ctx }) {
  const kind = field.type === 'video' ? 'video' : 'image';
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [broken, setBroken] = useState(false);

  const onFile = async (e) => {
    const f = e.target.files && e.target.files[0]; e.target.value = '';
    if (!f) return;
    const bad = validateFile(f, kind);
    if (bad) { setMsg(bad); return; }
    setBusy(true); setMsg('');
    try { const m = await cmsApi.uploadMedia(f, kind, ''); setBroken(false); onChange(m.url); ctx.toast('Uploaded. Add alt text in the Media tab.', 'ok'); ctx.refreshMedia(); }
    catch (er) { setMsg(er.message); } finally { setBusy(false); }
  };
  const pick = async () => { const u = await ctx.pickMedia(kind); if (u) { setBroken(false); onChange(u); } };

  return (
    <div className="wm-media">
      <div className="wm-media-prev">
        {value && !broken
          ? (kind === 'video' ? <video src={value} muted preload="metadata" /> : <img src={value} alt="" onError={() => setBroken(true)} />)
          : <span>{value ? 'Media not found' : 'Using built-in default'}</span>}
      </div>
      <div className="wm-media-ctl">
        <input className="wm-in" value={value || ''} placeholder={kind === 'video' ? 'https://.../video.mp4' : 'https://.../image.webp (empty = default)'} onChange={(e) => { setBroken(false); onChange(e.target.value); }} aria-label={field.label} />
        <div className="wm-row">
          <button type="button" className="wm-btn sm" onClick={() => fileRef.current && fileRef.current.click()} disabled={busy}>{busy ? 'Uploading...' : 'Upload'}</button>
          <button type="button" className="wm-btn sm" onClick={pick}>Library</button>
          {value && <button type="button" className="wm-btn sm ghost" onClick={() => onChange('')}>Use default</button>}
          <input ref={fileRef} type="file" hidden accept={MEDIA_RULES[kind].types.join(',')} onChange={onFile} />
        </div>
        <small className="wm-help">{MEDIA_RULES[kind].label}</small>
        {msg && <div className="wm-err" role="alert">{msg}</div>}
      </div>
    </div>
  );
}

function TagsField({ value, onChange, field }) {
  const [txt, setTxt] = useState('');
  const arr = Array.isArray(value) ? value : [];
  const add = () => { const v = txt.trim(); if (v && !arr.includes(v)) onChange([...arr, v]); setTxt(''); };
  return (
    <div>
      <div className="wm-chips">{arr.map((t) => <span className="wm-chip" key={t}>{t}<button type="button" aria-label={`Remove ${t}`} onClick={() => onChange(arr.filter((x) => x !== t))}>x</button></span>)}</div>
      <div className="wm-row"><input className="wm-in" value={txt} onChange={(e) => setTxt(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} placeholder="Type and press Enter" aria-label={field.label} /><button type="button" className="wm-btn sm" onClick={add}>Add</button></div>
    </div>
  );
}

/** Featured Programs picker. Sirf slug store hota hai, record duplicate nahi hota. */
function ProgramsField({ value, onChange, ctx, multi }) {
  const progs = ctx.programs;
  const arr = multi ? (Array.isArray(value) ? value : []) : (value ? [value] : []);
  if (progs.error) return <div className="wm-err" role="alert">Could not load Featured Programs: {progs.error} <button type="button" className="wm-link" onClick={ctx.reloadPrograms}>Retry</button></div>;
  if (!multi) {
    return (
      <select className="wm-in" value={value || ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">None (catalog page)</option>
        {value && !progs.list.some((p) => p.slug === value) && <option value={value}>{value} (not found in Featured Programs)</option>}
        {progs.list.map((p) => <option key={p.slug} value={p.slug}>{p.title} ({p.category || 'n/a'})</option>)}
      </select>
    );
  }
  return (
    <div>
      <div className="wm-chips">{arr.map((s) => { const p = progs.list.find((x) => x.slug === s); return <span className={`wm-chip ${p ? '' : 'warn'}`} key={s}>{p ? p.title : `${s} (missing)`}<button type="button" aria-label={`Remove ${s}`} onClick={() => onChange(arr.filter((x) => x !== s))}>x</button></span>; })}</div>
      <select className="wm-in" value="" onChange={(e) => { if (e.target.value && !arr.includes(e.target.value)) onChange([...arr, e.target.value]); }}>
        <option value="">{progs.loading ? 'Loading programs...' : 'Add a Featured Program'}</option>
        {progs.list.filter((p) => !arr.includes(p.slug)).map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}
      </select>
    </div>
  );
}

function ListField({ field, value, onChange, ctx, depth }) {
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(0);
  const [drag, setDrag] = useState(null);
  const label = (it, i) => (field.itemLabel && it && typeof it[field.itemLabel] === 'string' && it[field.itemLabel].trim()) || `${field.label.replace(/s$/, '')} ${i + 1}`;
  const set = (i, k, v) => onChange(items.map((it, j) => (j === i ? { ...it, [k]: v } : it)));
  const move = (from, to) => { if (to < 0 || to >= items.length || from === to) return; const n = [...items]; const [x] = n.splice(from, 1); n.splice(to, 0, x); onChange(n); setOpen(to); };
  const add = () => { onChange([...items, defaultItem(field.fields)]); setOpen(items.length); };
  const dup = (i) => { const c = JSON.parse(JSON.stringify(items[i])); onChange([...items.slice(0, i + 1), c, ...items.slice(i + 1)]); setOpen(i + 1); };
  const del = (i) => { if (window.confirm(`Delete "${label(items[i], i)}"?`)) { onChange(items.filter((_, j) => j !== i)); setOpen(-1); } };
  const flat = field.fields.every((f) => f.type === 'text');

  return (
    <div className={`wm-list d${depth}`}>
      {items.length === 0 && <div className="wm-empty">No items yet.</div>}
      {items.map((it, i) => (
        <div className={`wm-item ${open === i ? 'open' : ''}`} key={i} draggable onDragStart={() => setDrag(i)} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag != null) move(drag, i); setDrag(null); }}>
          <div className="wm-item-h">
            <span className="wm-grip" aria-hidden="true">::</span>
            <button type="button" className="wm-item-t" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{i + 1}. {label(it, i)}</button>
            {it && it.visible === false && <span className="wm-tag">Hidden</span>}
            {it && it.active === false && <span className="wm-tag">Inactive</span>}
            {it && it.verified === false && <span className="wm-tag amber">Sample</span>}
            <span className="wm-row">
              <button type="button" className="wm-ic" title="Move up" aria-label="Move up" onClick={() => move(i, i - 1)} disabled={i === 0}>^</button>
              <button type="button" className="wm-ic" title="Move down" aria-label="Move down" onClick={() => move(i, i + 1)} disabled={i === items.length - 1}>v</button>
              <button type="button" className="wm-ic" title="Duplicate" aria-label="Duplicate" onClick={() => dup(i)}>+1</button>
              <button type="button" className="wm-ic danger" title="Delete" aria-label="Delete" onClick={() => del(i)}>x</button>
            </span>
          </div>
          {open === i && (
            <div className={`wm-item-b ${flat ? 'two' : ''}`}>
              {field.fields.map((f) => <Field key={f.key} field={f} value={it[f.key]} onChange={(v) => set(i, f.key, v)} ctx={ctx} depth={depth + 1} />)}
            </div>
          )}
        </div>
      ))}
      <button type="button" className="wm-btn sm" onClick={add}>+ Add {field.label.toLowerCase().replace(/ \(.*\)/, '').replace(/s$/, '')}</button>
    </div>
  );
}

export function Field({ field, value, onChange, ctx, depth = 0 }) {
  const id = uid('f');
  const wide = ['textarea', 'list', 'image', 'video', 'tags', 'programs'].includes(field.type);
  let control;
  switch (field.type) {
    case 'textarea': control = <textarea id={id} className="wm-in" rows={3} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />; break;
    case 'number': control = <input id={id} className="wm-in" type="number" min={field.min} max={field.max} value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))} />; break;
    case 'datetime': control = <input id={id} className="wm-in" type="datetime-local" value={value || ''} onChange={(e) => onChange(e.target.value)} />; break;
    case 'toggle': control = <label className="wm-sw"><input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} /><i /><span>{value ? 'On' : 'Off'}</span></label>; break;
    case 'select': control = <select id={id} className="wm-in" value={value || ''} onChange={(e) => onChange(e.target.value)}><option value="">Default</option>{field.options.map((o) => <option key={o}>{o}</option>)}</select>; break;
    case 'image': case 'video': control = <MediaField field={field} value={value} onChange={onChange} ctx={ctx} />; break;
    case 'tags': control = <TagsField field={field} value={value} onChange={onChange} />; break;
    case 'program': control = <ProgramsField value={value} onChange={onChange} ctx={ctx} />; break;
    case 'programs': control = <ProgramsField value={value} onChange={onChange} ctx={ctx} multi />; break;
    case 'list': control = <ListField field={field} value={value} onChange={onChange} ctx={ctx} depth={depth} />; break;
    default: control = <input id={id} className="wm-in" type={field.type === 'url' ? 'url' : 'text'} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
  }
  return (
    <div className={`wm-field ${wide ? 'wide' : ''}`}>
      <label htmlFor={id} className="wm-label">{field.label}</label>
      {control}
      {field.help && <small className="wm-help">{field.help}</small>}
    </div>
  );
}
