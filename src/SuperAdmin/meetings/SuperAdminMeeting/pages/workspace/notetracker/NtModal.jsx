"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import {
  T,
  Button,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  RADIUS,
  SHADOW_DROPDOWN,
} from "@/design-system";
import { NT_GAP } from "./ntUtils";

// Requires the page to render <style>{NT_CSS}</style> (nt-overlay / nt-modal classes).
//
// Rendered through a portal into <body>: .ws-content is a CSS container
// (container-type: inline-size), which would otherwise trap position:fixed overlays
// inside the scrolling content area.

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

let modalSeq = 0;

/**
 * Accessible modal dialog: role="dialog", Escape closes, Tab is kept inside,
 * focus goes to the first [data-autofocus] element (or the dialog) and is
 * restored on close, background scroll is locked. Modals may be nested.
 *
 * @param {string} title
 * @param {"light"|"dark"} mode
 * @param {() => void} onClose
 * @param {React.ReactNode} [footer]   right-aligned action row
 * @param {number} [width=560]         max width in px
 * @param {boolean} [busy]             while true the dialog can not be closed
 */
export default function NtModal({
  title,
  mode,
  onClose,
  children,
  footer,
  width = 560,
  busy = false,
}) {
  const t = T[mode] || T.light;
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const busyRef = useRef(busy);
  const [titleId] = useState(() => `nt-modal-title-${++modalSeq}`);

  useEffect(() => {
    onCloseRef.current = onClose;
    busyRef.current = busy;
  });

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = dialogRef.current;
    if (el) {
      const auto = el.querySelector("[data-autofocus]");
      (auto || el).focus();
    }
    return () => {
      document.body.style.overflow = prevOverflow;
      if (prevFocus && typeof prevFocus.focus === "function") prevFocus.focus();
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      if (!busyRef.current) onCloseRef.current?.();
      return;
    }
    if (e.key !== "Tab") return;
    e.stopPropagation();
    const root = dialogRef.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll(FOCUSABLE)).filter(
      (n) => n.offsetParent !== null || n === document.activeElement,
    );
    if (nodes.length === 0) {
      e.preventDefault();
      root.focus();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === root)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="nt-overlay"
      style={{ background: t.overlayBg }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !busyRef.current) {
          onCloseRef.current?.();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="nt-modal"
        onKeyDown={handleKeyDown}
        style={{
          maxWidth: width,
          background: t.cardBg,
          color: t.text,
          border: `1px solid ${t.border}`,
          borderRadius: RADIUS.standardCard,
          boxShadow: SHADOW_DROPDOWN[mode] || SHADOW_DROPDOWN.light,
          fontFamily: FONT_FAMILY,
          outline: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: NT_GAP.md,
            padding: `${NT_GAP.md + NT_GAP.sm}px ${NT_GAP.md + NT_GAP.sm}px ${NT_GAP.md}px`,
          }}
        >
          <h2
            id={titleId}
            style={{
              margin: 0,
              minWidth: 0,
              fontSize: FONT_SIZE.sectionTitle,
              fontWeight: FONT_WEIGHT.semibold,
              color: t.text,
              overflowWrap: "anywhere",
            }}
          >
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            mode={mode}
            icon={X}
            disabled={busy}
            onClick={() => onCloseRef.current?.()}
            aria-label="Close dialog"
            style={{ padding: `0 ${NT_GAP.sm}px` }}
          />
        </div>

        <div
          className="nt-modal-body"
          style={{
            padding: `0 ${NT_GAP.md + NT_GAP.sm}px ${NT_GAP.md + NT_GAP.sm}px`,
          }}
        >
          {children}
        </div>

        {footer && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: NT_GAP.sm,
              padding: `${NT_GAP.md}px ${NT_GAP.md + NT_GAP.sm}px`,
              borderTop: `1px solid ${t.border}`,
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
