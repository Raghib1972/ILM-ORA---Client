"use client";

import React from "react";
import PageHead from "../../../components/PageHead";
import { NT_CSS } from "./ntStyles";
import NtApiError from "./NtApiError";

/**
 * Common page chrome for the Note Tracker pages: scoped CSS, the page head,
 * and — when `fatal` is set (feature off / no access / workflows off) — the
 * error panel INSTEAD of the page content.
 *
 * Children are rendered as direct children of .ws-content so the workspace's
 * vertical rhythm (.ws-content > * + *) applies, exactly like the 3a pages.
 */
export default function NtPage({ title, subtitle, fatal, mode, actions, children }) {
  return (
    <div className="ws-content">
      <style>{NT_CSS}</style>
      <PageHead
        eyebrow="Note Tracker"
        title={title}
        subtitle={subtitle}
        actions={actions}
      />
      {fatal ? <NtApiError error={fatal} mode={mode} /> : children}
    </div>
  );
}
