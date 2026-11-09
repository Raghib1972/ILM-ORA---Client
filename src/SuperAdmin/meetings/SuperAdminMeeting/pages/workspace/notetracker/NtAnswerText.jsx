"use client";

import React, { useMemo } from "react";
import { T, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT } from "@/design-system";
import { NT_GAP } from "./ntUtils";

// Splits plain text into paragraphs, bullet lists ("- ", "* ", "• ") and
// numbered lists ("1. ", "1) "). Everything is rendered as React text nodes —
// never as HTML — so model output can not inject markup.
export function parseBlocks(text) {
  const lines = String(text ?? "")
    .replace(/\r\n?/g, "\n")
    .split("\n");
  const blocks = [];
  let cur = null;
  const flush = () => {
    if (cur) blocks.push(cur);
    cur = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flush();
      continue;
    }
    const ul = line.match(/^\s*[-*•]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ul) {
      if (!cur || cur.type !== "ul") {
        flush();
        cur = { type: "ul", items: [] };
      }
      cur.items.push(ul[1]);
    } else if (ol) {
      if (!cur || cur.type !== "ol") {
        flush();
        cur = { type: "ol", items: [] };
      }
      cur.items.push(ol[1]);
    } else {
      if (!cur || cur.type !== "p") {
        flush();
        cur = { type: "p", lines: [] };
      }
      cur.lines.push(line.trim());
    }
  }
  flush();
  return blocks;
}

export default function NtAnswerText({ text, mode }) {
  const t = T[mode] || T.light;
  const blocks = useMemo(() => parseBlocks(text), [text]);
  if (blocks.length === 0) return null;

  const base = {
    margin: 0,
    color: t.text,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.body,
    lineHeight: LINE_HEIGHT.body,
    overflowWrap: "anywhere",
  };
  const listBase = { ...base, paddingLeft: NT_GAP.md + NT_GAP.sm };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: NT_GAP.sm }}>
      {blocks.map((b, i) => {
        if (b.type === "ul") {
          return (
            <ul key={i} style={listBase}>
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "ol") {
          return (
            <ol key={i} style={listBase}>
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={i} style={base}>
            {b.lines.map((ln, j) => (
              <React.Fragment key={j}>
                {j > 0 && <br />}
                {ln}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
