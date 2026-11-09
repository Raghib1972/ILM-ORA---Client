"use client";

import React, { forwardRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Video,
  X,
} from "lucide-react";
import {
  T,
  Button,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  RADIUS,
} from "@/design-system";
import { NT_GAP, inputStyle, sessionLabel } from "./ntUtils";
import NtModal from "./NtModal";
import NtSessionPicker from "./NtSessionPicker";

// Requires the page to render <style>{NT_CSS}</style>.

// ───────────── banner (info / warning / error / success) ─────────────
/**
 * @param {"info"|"warning"|"error"|"success"} [tone="info"]
 * @param {string} [title]
 */
export function NtBanner({ tone = "info", title, mode, children, style }) {
  const t = T[mode] || T.light;
  const palette = {
    info: { bg: t.pillBg, border: t.pillBorder, color: t.pillText, Icon: Info },
    warning: {
      bg: t.newBadgeBg,
      border: t.newBadgeBorder,
      color: t.newBadgeText,
      Icon: AlertTriangle,
    },
    error: {
      bg: t.overdueBg,
      border: t.overdueBorder,
      color: t.overdueText,
      Icon: AlertTriangle,
    },
    success: {
      bg: t.statusCompletedBg,
      border: t.statusCompletedBg,
      color: t.statusCompletedText,
      Icon: CheckCircle2,
    },
  };
  const p = palette[tone] || palette.info;
  const Icon = p.Icon;
  return (
    <div
      role={tone === "error" ? "alert" : "note"}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: NT_GAP.sm,
        padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
        borderRadius: RADIUS.input,
        background: p.bg,
        border: `1px solid ${p.border}`,
        color: p.color,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE.bodySmall,
        lineHeight: LINE_HEIGHT.body,
        ...style,
      }}
    >
      <Icon size={14} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
      <div style={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>
        {title && <div style={{ fontWeight: FONT_WEIGHT.semibold }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

// ───────────── field wrapper ─────────────
/**
 * Label + hint + error + optional character counter around ONE form control.
 * The control receives id, aria-describedby, aria-invalid and aria-required.
 * @param {string} id       required: used for the label and the aria links
 */
export function NtField({
  id,
  label,
  hint,
  error,
  required = false,
  count,
  max,
  mode,
  children,
  style,
}) {
  const t = T[mode] || T.light;
  const describedBy =
    [hint ? `${id}-hint` : null, error ? `${id}-err` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const control = React.isValidElement(children)
    ? React.cloneElement(children, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        "aria-required": required ? true : undefined,
      })
    : children;
  const over = max !== undefined && count !== undefined && count > max;
  const small = { fontFamily: FONT_FAMILY, fontSize: FONT_SIZE.caption };

  return (
    <div style={{ minWidth: 0, ...style }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: NT_GAP.sm,
          marginBottom: NT_GAP.xs,
        }}
      >
        <label
          htmlFor={id}
          style={{
            ...small,
            fontSize: FONT_SIZE.bodySmall,
            fontWeight: FONT_WEIGHT.semibold,
            color: t.text,
          }}
        >
          {label}
          {required && (
            <span aria-hidden="true" style={{ color: t.overdueText }}>
              {" *"}
            </span>
          )}
        </label>
        {max !== undefined && count !== undefined && (
          <span style={{ ...small, color: over ? t.overdueText : t.textMuted }}>
            {`${count} / ${max}`}
          </span>
        )}
      </div>
      {control}
      {hint && !error && (
        <div id={`${id}-hint`} style={{ ...small, marginTop: NT_GAP.xs, color: t.textMuted }}>
          {hint}
        </div>
      )}
      {error && (
        <div
          id={`${id}-err`}
          role="alert"
          style={{ ...small, marginTop: NT_GAP.xs, color: t.overdueText }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

// ───────────── native controls styled with tokens ─────────────
const controlStyle = (t, mode, invalid) => ({
  ...inputStyle(t, mode),
  border: `1px solid ${invalid ? t.overdueText : t.border}`,
});

export const NtTextInput = forwardRef(function NtTextInput(
  { mode, invalid = false, style, type = "text", ...rest },
  ref,
) {
  const t = T[mode] || T.light;
  return (
    <input
      ref={ref}
      type={type}
      className="nt-input"
      {...rest}
      style={{ ...controlStyle(t, mode, invalid), ...style }}
    />
  );
});

export const NtTextArea = forwardRef(function NtTextArea(
  { mode, invalid = false, rows = 4, style, ...rest },
  ref,
) {
  const t = T[mode] || T.light;
  return (
    <textarea
      ref={ref}
      rows={rows}
      className="nt-input"
      {...rest}
      style={{
        ...controlStyle(t, mode, invalid),
        resize: "vertical",
        lineHeight: LINE_HEIGHT.body,
        ...style,
      }}
    />
  );
});

/** options: [{ value, label }] */
export const NtSelect = forwardRef(function NtSelect(
  { mode, invalid = false, options = [], style, ...rest },
  ref,
) {
  const t = T[mode] || T.light;
  return (
    <select
      ref={ref}
      className="nt-input"
      {...rest}
      style={{ ...controlStyle(t, mode, invalid), cursor: "pointer", ...style }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
});

// ───────────── pager ─────────────
export function NtPager({ page, totalPages, totalElements, onPage, mode, disabled = false }) {
  const t = T[mode] || T.light;
  if (!totalPages || totalPages <= 1) return null;
  return (
    <nav
      aria-label="Pagination"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: NT_GAP.sm,
        marginTop: NT_GAP.md,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE.bodySmall,
        color: t.textSub,
      }}
    >
      <span aria-live="polite">
        {`Page ${page + 1} of ${totalPages}`}
        {Number.isFinite(Number(totalElements)) && totalElements > 0
          ? ` · ${totalElements} items`
          : ""}
      </span>
      <span style={{ display: "inline-flex", gap: NT_GAP.sm }}>
        <Button
          variant="secondary"
          size="sm"
          mode={mode}
          icon={ChevronLeft}
          disabled={disabled || page <= 0}
          onClick={() => onPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          mode={mode}
          disabled={disabled || page >= totalPages - 1}
          onClick={() => onPage(page + 1)}
        >
          Next
          <ChevronRight size={14} aria-hidden="true" />
        </Button>
      </span>
    </nav>
  );
}

// ───────────── empty state ─────────────
export function NtEmptyState({ mode, icon: Icon, title, text, action }) {
  const t = T[mode] || T.light;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: NT_GAP.sm,
        padding: `${NT_GAP.md * 3}px ${NT_GAP.md}px`,
        textAlign: "center",
        borderRadius: RADIUS.messageBubble,
        background: t.emptyBg,
        border: `1px dashed ${t.emptyBorder}`,
        color: t.textSub,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE.body,
      }}
    >
      {Icon && <Icon size={26} color={t.emptyIcon} aria-hidden="true" />}
      {title && (
        <div style={{ fontWeight: FONT_WEIGHT.semibold, color: t.text }}>{title}</div>
      )}
      {text && (
        <div style={{ maxWidth: 440, fontSize: FONT_SIZE.bodySmall, lineHeight: LINE_HEIGHT.body }}>
          {text}
        </div>
      )}
      {action}
    </div>
  );
}

// ───────────── meeting field (filter or form field) ─────────────
/**
 * Shows the chosen meeting and opens the 3a session picker in a dialog.
 * value: { sessionId, title?, label?, date? } | null
 * onChange(value | null)
 * Pair it with <NtField id=...> (the id goes on the "Choose meeting" button).
 */
export function NtSessionField({
  id,
  mode,
  value,
  onChange,
  onFatal,
  disabled = false,
  allowClear = true,
}) {
  const t = T[mode] || T.light;
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: NT_GAP.sm,
        minWidth: 0,
      }}
    >
      {value && value.sessionId && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: NT_GAP.xs,
            maxWidth: "100%",
            padding: `${NT_GAP.xs}px ${NT_GAP.sm}px ${NT_GAP.xs}px ${NT_GAP.md}px`,
            borderRadius: RADIUS.pill,
            background: t.pillBg,
            border: `1px solid ${t.pillBorder}`,
            color: t.pillText,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.bodySmall,
          }}
        >
          <span style={{ overflowWrap: "anywhere" }}>{sessionLabel(value)}</span>
          {allowClear && (
            <Button
              variant="ghost"
              size="sm"
              mode={mode}
              icon={X}
              disabled={disabled}
              onClick={() => onChange(null)}
              aria-label="Remove meeting"
              style={{ height: 22, padding: `0 ${NT_GAP.xs}px` }}
            />
          )}
        </span>
      )}
      <Button
        id={id}
        variant="secondary"
        size="sm"
        mode={mode}
        icon={Video}
        disabled={disabled}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {value && value.sessionId ? "Change meeting" : "Choose a meeting"}
      </Button>

      {open && (
        <NtModal title="Choose a meeting" mode={mode} width={640} onClose={() => setOpen(false)}>
          <NtSessionPicker
            mode={mode}
            selectedId={value?.sessionId || null}
            initialDate={value?.date}
            onSelect={(s, date) => {
              onChange({
                sessionId: s.sessionId,
                title: s.title,
                label: s.label,
                date,
              });
              setOpen(false);
            }}
            onFatal={(info) => {
              setOpen(false);
              onFatal?.(info);
            }}
          />
        </NtModal>
      )}
    </div>
  );
}
