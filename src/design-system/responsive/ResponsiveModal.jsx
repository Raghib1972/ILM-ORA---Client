"use client";

// Centered dialog on desktop/tablet, bottom sheet on phones (<768px).
// Handles: portal, ESC, backdrop click, scroll lock, focus trap + restore,
// 90dvh max height with internal scroll, safe-area padding.
//
//   <ResponsiveModal open={open} onClose={() => setOpen(false)} title="Create batch"
//        footer={<><button onClick={close}>Cancel</button><button>Save</button></>}>
//     ...form...
//   </ResponsiveModal>
import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useFocusTrap } from "../../hooks/useFocusTrap";

export default function ResponsiveModal({
  open,
  onClose,
  title,
  children,
  footer,
  maxWidth = 560,
  closeOnBackdrop = true,
  hideClose = false,
  ariaLabel,
  className = "",
  panelStyle,
}) {
  const [mounted, setMounted] = useState(false); // portal target exists only on the client
  const panelRef = useRef(null);
  const titleId = useId();

  useEffect(() => setMounted(true), []);
  const visible = mounted && open;

  useLockBodyScroll(visible);
  useFocusTrap(panelRef, visible);

  useEffect(() => {
    if (!visible) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  if (!visible) return null;

  return createPortal(
    <div
      className="rs-sheet-backdrop"
      onPointerDown={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={panelRef}
        className={`rs-sheet ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        tabIndex={-1}
        style={{ "--rs-sheet-w": typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth, ...panelStyle }}
      >
        <div className="rs-sheet-handle" aria-hidden="true" />
        {title || !hideClose ? (
          <div className="rs-sheet-head">
            {title ? (
              <h2 id={titleId} className="rs-sheet-title">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {!hideClose ? (
              <button type="button" className="rs-sheet-close rs-touch" onClick={() => onClose?.()} aria-label="Close">
                ×
              </button>
            ) : null}
          </div>
        ) : null}
        <div className="rs-sheet-body">{children}</div>
        {footer ? <div className="rs-sheet-foot">{footer}</div> : null}
      </div>
    </div>,
    document.body
  );
}
