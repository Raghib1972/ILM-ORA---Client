"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Doubts from "./Doubts";
import { BUTTON_DARK, BUTTON_DARK_HOVER } from "@/design-system";

// Phase 2c notes:
//  - --bottom-nav-h (set by the Phase 2a BottomNav; falls back to 0px) lifts the
//    button + panel above the bottom tab bar on phones.
//  - z-index sits just above --z-nav, so the chat stays below the drawer,
//    modals and toasts (--z-drawer / --z-modal / --z-toast).
//  - 100vh -> 100dvh (with a vh fallback line), safe-area insets respected.
//  - Styles are rendered via <style> (SSR-safe) instead of touching `document`
//    at module load, which crashes during Next.js server rendering.
const STYLES = `
.cwb-btn{position:fixed;
  bottom:calc(28px + var(--bottom-nav-h, 0px) + env(safe-area-inset-bottom, 0px));
  right:max(28px, env(safe-area-inset-right, 0px));
  width:56px;height:56px;border-radius:50%;
  background:${BUTTON_DARK};border:none;display:flex;align-items:center;justify-content:center;
  color:#ffffff;cursor:pointer;box-shadow:0 8px 24px rgba(31,30,27,0.35);
  z-index:calc(var(--z-nav, 40) + 2);transition:transform .15s ease,box-shadow .2s ease;}
@media (hover:hover){
  .cwb-btn:hover{background:${BUTTON_DARK_HOVER};transform:translateY(-2px);box-shadow:0 12px 30px rgba(31,30,27,0.45);}
}
.cwb-btn:active{transform:translateY(0);}

.cwb-panel{position:fixed;
  bottom:calc(98px + var(--bottom-nav-h, 0px) + env(safe-area-inset-bottom, 0px));
  right:max(28px, env(safe-area-inset-right, 0px));
  width:680px;
  height:min(600px, calc(100dvh - 180px));
  height:min(600px, calc(100dvh - 180px - var(--bottom-nav-h, 0px) - env(safe-area-inset-bottom, 0px)));
  max-width:calc(100vw - 40px);
  z-index:calc(var(--z-nav, 40) + 1);border-radius:20px;overflow:hidden;
  box-shadow:0 16px 48px rgba(0,0,0,0.22);
  animation:cwb-pop .18s ease-out;}
@keyframes cwb-pop{
  from{opacity:0;transform:translateY(12px) scale(.98);}
  to{opacity:1;transform:translateY(0) scale(1);}
}
@media (prefers-reduced-motion: reduce){
  .cwb-panel{animation:none;}
  .cwb-btn{transition:none;}
}

@media (max-width:820px){
  .cwb-panel{width:calc(100vw - 40px);}
}
@media (max-width:480px){
  .cwb-panel{right:max(12px, env(safe-area-inset-right, 0px));
    bottom:calc(88px + var(--bottom-nav-h, 0px) + env(safe-area-inset-bottom, 0px));
    width:calc(100vw - 24px);
    height:calc(100dvh - 160px);
    height:calc(100dvh - 160px - var(--bottom-nav-h, 0px) - env(safe-area-inset-bottom, 0px) - env(safe-area-inset-top, 0px));}
  .cwb-btn{right:max(16px, env(safe-area-inset-right, 0px));
    bottom:calc(16px + var(--bottom-nav-h, 0px) + env(safe-area-inset-bottom, 0px));}
}
`;

const ChatWidgetButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{STYLES}</style>
      {open && (
        <div className="cwb-panel">
          <Doubts compact />
        </div>
      )}
      <button
        className="cwb-btn"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
};

export default ChatWidgetButton;