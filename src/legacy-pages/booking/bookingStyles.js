export const BOOKING_CSS = `
.bk-root{min-height:100vh;background:#f8f9fb;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Inter,system-ui,Arial,sans-serif;color:#1a1a1a}
.bk-card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,.06);display:flex;width:100%;max-width:1000px;min-height:560px;overflow:hidden}
.bk-side{width:320px;padding:32px;border-right:1px solid #e5e7eb;flex-shrink:0}
.bk-main{flex:1;padding:32px;min-width:0}
.bk-host{color:#6b7280;font-weight:600;font-size:15px}
.bk-title{font-size:26px;font-weight:700;margin:6px 0 16px}
.bk-meta{display:flex;align-items:center;gap:8px;color:#4b5563;margin:8px 0;font-size:15px}
.bk-desc{color:#6b7280;font-size:14px;margin-top:16px;white-space:pre-wrap}
.bk-h2{font-size:20px;font-weight:700;margin:0 0 20px}
.bk-cols{display:flex;gap:28px;flex-wrap:wrap}
.bk-cal{width:340px;max-width:100%}
.bk-cal-head{display:flex;align-items:center;justify-content:center;gap:24px;margin-bottom:16px;font-weight:600}
.bk-nav{background:none;border:0;cursor:pointer;color:#006bff;padding:6px;border-radius:50%;display:flex}
.bk-nav:disabled{color:#c4c9d1;cursor:default}
.bk-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;text-align:center}
.bk-dow{font-size:12px;font-weight:600;color:#4b5563;padding:6px 0}
.bk-day{aspect-ratio:1;border:0;border-radius:50%;background:none;font-size:15px;color:#9ca3af;position:relative}
.bk-day.avail{background:#e8f1ff;color:#0054c7;font-weight:700;cursor:pointer}
.bk-day.avail:hover{background:#d3e5ff}
.bk-day.sel{background:#006bff;color:#fff}
.bk-day.today::after{content:"";position:absolute;bottom:6px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:currentColor}
.bk-tz{margin-top:24px;font-size:13px}
.bk-tz label{font-weight:600;display:block;margin-bottom:6px}
.bk-tz select{max-width:100%;padding:6px 8px;border:1px solid #d1d5db;border-radius:6px;background:#fff}
.bk-slots{width:240px;max-height:440px;overflow-y:auto;padding-right:6px}
.bk-slots h3{font-size:15px;font-weight:600;margin:0 0 14px}
.bk-slot-row{display:flex;gap:8px;margin-bottom:10px}
.bk-slot{flex:1;padding:14px 8px;border:1px solid #006bff;color:#006bff;background:#fff;border-radius:6px;font-weight:700;cursor:pointer;font-size:15px}
.bk-slot:hover{border-width:2px}
.bk-slot.sel{background:#6b7280;border-color:#6b7280;color:#fff}
.bk-next{flex:1;padding:14px 8px;border:0;background:#006bff;color:#fff;border-radius:6px;font-weight:700;cursor:pointer}
.bk-form{max-width:420px}
.bk-form label{display:block;font-weight:600;font-size:14px;margin:16px 0 6px}
.bk-form input,.bk-form textarea{width:100%;padding:10px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:15px;box-sizing:border-box;font-family:inherit}
.bk-form input:focus,.bk-form textarea:focus{outline:2px solid #006bff;outline-offset:0;border-color:#006bff}
.bk-chip{display:inline-flex;align-items:center;gap:6px;background:#eef2ff;border-radius:6px;padding:4px 8px;margin:0 6px 6px 0;font-size:13px}
.bk-chip button{border:0;background:none;cursor:pointer;color:#6b7280}
.bk-primary{background:#006bff;color:#fff;border:0;border-radius:40px;padding:13px 24px;font-weight:700;font-size:15px;cursor:pointer;margin-top:22px}
.bk-primary:disabled{opacity:.6;cursor:default}
.bk-ghost{background:#fff;color:#006bff;border:1px solid #006bff;border-radius:40px;padding:11px 22px;font-weight:700;cursor:pointer}
.bk-danger{background:#fff;color:#dc2626;border:1px solid #dc2626;border-radius:40px;padding:11px 22px;font-weight:700;cursor:pointer}
.bk-err{color:#dc2626;font-size:14px;margin-top:12px}
.bk-back{display:inline-flex;align-items:center;gap:6px;border:1px solid #e5e7eb;background:#fff;border-radius:50%;width:40px;height:40px;justify-content:center;cursor:pointer;margin-bottom:16px}
.bk-center{text-align:center;max-width:520px;margin:0 auto}
.bk-box{border:1px solid #e5e7eb;border-radius:10px;padding:20px;text-align:left;margin:22px 0}
.bk-box .bk-meta{margin:10px 0}
.bk-spin{animation:bkspin 1s linear infinite}
@keyframes bkspin{to{transform:rotate(360deg)}}
@media(max-width:760px){.bk-card{flex-direction:column}.bk-side{width:auto;border-right:0;border-bottom:1px solid #e5e7eb}.bk-slots{width:100%;max-height:none}}
`;