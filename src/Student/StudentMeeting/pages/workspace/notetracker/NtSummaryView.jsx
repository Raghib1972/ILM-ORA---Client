"use client";

import React from "react";
import {
  T,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  LETTER_SPACING,
} from "@/design-system";
import { NT_GAP } from "./ntUtils";

// Renders a Task Orbit summary JSON using the same field names and layout idea
// as MeetingReports.jsx. Everything is plain React text (no HTML injection).
//   kind="overall": overview, key_updates[{person,update}], common_blockers[],
//                   action_items[{owner,item}], decisions[]
//   kind="person":  summary, worked_on[], tasks_done[], tasks_planned[],
//                   blockers[], notable_points[{time,point}]

const itemText = (x) => {
  if (typeof x === "string") return x;
  if (x && typeof x === "object") {
    return Object.values(x)
      .filter((v) => typeof v === "string" && v)
      .join(" — ");
  }
  return x === null || x === undefined ? "" : String(x);
};

const hasItems = (a) => Array.isArray(a) && a.length > 0;

function Block({ title, t, children }) {
  return (
    <div style={{ marginTop: NT_GAP.md }}>
      <div
        style={{
          marginBottom: NT_GAP.xs,
          fontSize: FONT_SIZE.caption,
          fontWeight: FONT_WEIGHT.bold,
          letterSpacing: LETTER_SPACING.eyebrow,
          textTransform: "uppercase",
          color: t.textLabel,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function List({ t, children }) {
  return (
    <ul
      style={{
        margin: 0,
        paddingLeft: NT_GAP.md + NT_GAP.sm,
        color: t.text,
        fontSize: FONT_SIZE.body,
        lineHeight: LINE_HEIGHT.body,
        overflowWrap: "anywhere",
      }}
    >
      {children}
    </ul>
  );
}

function Bullets({ title, items, t }) {
  if (!hasItems(items)) return null;
  return (
    <Block title={title} t={t}>
      <List t={t}>
        {items.map((x, i) => (
          <li key={i}>{itemText(x)}</li>
        ))}
      </List>
    </Block>
  );
}

// items of { [nameKey]: "...", [textKey]: "..." } shown as "<b>name:</b> text"
function Owned({ title, items, nameKey, textKey, t }) {
  if (!hasItems(items)) return null;
  return (
    <Block title={title} t={t}>
      <List t={t}>
        {items.map((x, i) => (
          <li key={i}>
            {x && typeof x === "object" ? (
              <>
                <strong style={{ fontWeight: FONT_WEIGHT.semibold }}>
                  {itemText(x[nameKey])}:
                </strong>{" "}
                {itemText(x[textKey])}
              </>
            ) : (
              itemText(x)
            )}
          </li>
        ))}
      </List>
    </Block>
  );
}

/**
 * @param {object|string|null} summary
 * @param {"overall"|"person"} [kind="overall"]
 * @param {"light"|"dark"} mode
 */
export default function NtSummaryView({ summary, kind = "overall", mode }) {
  const t = T[mode] || T.light;
  if (!summary) return null;

  const lead = {
    margin: 0,
    color: t.text,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.body,
    lineHeight: LINE_HEIGHT.body,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  };

  if (typeof summary === "string") {
    return <p style={lead}>{summary}</p>;
  }

  if (kind === "person") {
    const s = summary;
    return (
      <div style={{ fontFamily: FONT_FAMILY }}>
        {s.summary && <p style={lead}>{itemText(s.summary)}</p>}
        <Bullets title="Worked on" items={s.worked_on} t={t} />
        <Bullets title="Tasks done" items={s.tasks_done} t={t} />
        <Bullets title="Tasks planned" items={s.tasks_planned} t={t} />
        <Bullets title="Blockers" items={s.blockers} t={t} />
        {hasItems(s.notable_points) && (
          <Block title="Notable points" t={t}>
            <List t={t}>
              {s.notable_points.map((n, i) => (
                <li key={i}>
                  {n && typeof n === "object" ? (
                    <>
                      <strong style={{ fontWeight: FONT_WEIGHT.semibold }}>
                        {itemText(n.time)}
                      </strong>{" "}
                      {itemText(n.point)}
                    </>
                  ) : (
                    itemText(n)
                  )}
                </li>
              ))}
            </List>
          </Block>
        )}
      </div>
    );
  }

  const s = summary;
  return (
    <div style={{ fontFamily: FONT_FAMILY }}>
      {s.overview && <p style={lead}>{itemText(s.overview)}</p>}
      <Owned title="Key updates" items={s.key_updates} nameKey="person" textKey="update" t={t} />
      <Bullets title="Common blockers" items={s.common_blockers} t={t} />
      <Owned title="Action items" items={s.action_items} nameKey="owner" textKey="item" t={t} />
      <Bullets title="Decisions" items={s.decisions} t={t} />
    </div>
  );
}
