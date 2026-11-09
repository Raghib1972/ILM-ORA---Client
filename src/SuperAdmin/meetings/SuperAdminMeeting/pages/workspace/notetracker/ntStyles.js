// Scoped styles (nt- prefix). Only layout, breakpoints and animations live here —
// every colour, font and radius comes from the design system via style objects
// (the only colour used here is the design-system accent, for focus rings).
// Same idea as MR_CSS in MeetingReports.jsx; workspace-styles.css stays untouched.
import { BREAKPOINTS, GRID_GAP, CLAUDE_ACCENT } from "@/design-system";
import { NT_GAP } from "./ntUtils";

// Above the workspace sidebar drawer (z-index 220), below the toast stack (9999).
export const NT_Z_MODAL = 5000;

export const NT_CSS = `
.nt-two-col{display:grid;grid-template-columns:340px minmax(0,1fr);gap:${GRID_GAP.dashRowGrid}px;align-items:start}
.nt-stack{display:flex;flex-direction:column;gap:${GRID_GAP.dashRowGrid}px;min-width:0}
.nt-thread{min-height:240px;max-height:max(320px,calc(100vh - 420px));overflow-y:auto}
.nt-composer-row{display:flex;gap:${GRID_GAP.dashRowGrid}px;align-items:flex-end}

.nt-toolbar{display:flex;flex-wrap:wrap;align-items:flex-end;gap:${NT_GAP.md}px}
.nt-toolbar-grow{flex:1 1 auto;min-width:0}
.nt-filter{display:flex;flex-direction:column;gap:${NT_GAP.xs}px;min-width:160px;max-width:100%}
.nt-card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:${GRID_GAP.coursesGrid}px}
.nt-form-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:${NT_GAP.md}px}
.nt-form-stack{display:flex;flex-direction:column;gap:${NT_GAP.md}px}
.nt-row-actions{display:flex;flex-wrap:wrap;align-items:center;gap:${NT_GAP.sm}px}
.nt-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
.nt-table{width:100%;border-collapse:collapse;min-width:680px}
.nt-runs-split{display:grid;grid-template-columns:minmax(0,380px) minmax(0,1fr);gap:${GRID_GAP.dashRowGrid}px;align-items:start}
.nt-node-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:${NT_GAP.md}px}

.nt-overlay{position:fixed;top:0;right:0;bottom:0;left:0;z-index:${NT_Z_MODAL};display:flex;align-items:center;justify-content:center;padding:${GRID_GAP.coursesGrid}px;box-sizing:border-box}
.nt-modal{display:flex;flex-direction:column;width:100%;max-height:calc(100vh - ${GRID_GAP.coursesGrid * 2}px);box-sizing:border-box}
.nt-modal-body{overflow-y:auto;min-height:0}

.nt-input:focus-visible,.nt-focus:focus-visible,.nt-modal button:focus-visible,.nt-modal a:focus-visible,.ws-content select:focus-visible,.ws-content textarea:focus-visible{outline:2px solid ${CLAUDE_ACCENT};outline-offset:2px}

@media (max-width:${BREAKPOINTS.tablet}px){
  .nt-two-col{grid-template-columns:1fr}
  .nt-runs-split{grid-template-columns:1fr}
  .nt-thread{max-height:60vh}
  .nt-form-row,.nt-node-grid{grid-template-columns:1fr}
}
@media (max-width:${BREAKPOINTS.mobile}px){
  .nt-composer-row{flex-direction:column;align-items:stretch}
  .nt-card-grid{grid-template-columns:1fr}
  .nt-overlay{padding:${NT_GAP.sm}px}
  .nt-modal{max-height:calc(100vh - ${NT_GAP.sm * 2}px)}
  .nt-filter{min-width:100%}
}
@keyframes nt-pulse{0%,100%{opacity:1}50%{opacity:.45}}
.nt-skel{animation:nt-pulse 1.4s ease-in-out infinite}
@keyframes nt-blink{0%,100%{opacity:1}50%{opacity:.15}}
.nt-dot{animation:nt-blink 1.4s ease infinite}
.nt-dot:nth-child(2){animation-delay:.2s}
.nt-dot:nth-child(3){animation-delay:.4s}
@keyframes nt-spin{to{transform:rotate(360deg)}}
.nt-spin{animation:nt-spin 1s linear infinite}
@media (prefers-reduced-motion:reduce){.nt-skel,.nt-dot,.nt-spin{animation:none}}
`;

export default NT_CSS;
