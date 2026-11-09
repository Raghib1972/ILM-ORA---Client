"use client";

import React from "react";
import { Badge } from "@/design-system";
import { statusBadge } from "./ntUtils";

/**
 * One badge for every status in Note Tracker.
 * @param {"workflow"|"run"|"node"|"task"|"activity"|"source"} kind
 * @param {string} value  e.g. "ACTIVE", "RUNNING", "OK", "OPEN", "SUCCESS", "FROM_ANSWER"
 */
export default function NtStatusBadge({ kind, value, style }) {
  const b = statusBadge(kind, value);
  return (
    <Badge tone={b.tone} style={style}>
      {b.label}
    </Badge>
  );
}
