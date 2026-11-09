"use client";

// Table on wide screens, stacked cards on narrow ones.
//
// DATA-DRIVEN (recommended):
//   <ResponsiveTable
//     rowKey="id"
//     columns={[
//       { key: "name",  label: "Name", primary: true },           // card title on phones
//       { key: "batch", label: "Batch" },
//       { key: "score", label: "Score", numeric: true },
//       { key: "act",   label: "", render: (r) => <button>Open</button> },
//     ]}
//     rows={data}
//   />
//
// CHILDREN MODE (wrap an existing table): pass your own <thead>/<tbody> as
// children and put data-label="Header" on every <td> so phones know the label.
//
// cards: "md" (default) cards below 768px | "lg" cards below 1024px | "never" scroll only
import React from "react";

export default function ResponsiveTable({
  columns,
  rows,
  rowKey = "id",
  cards = "md",
  caption,
  empty = "No data",
  onRowClick,
  className = "",
  style,
  children,
}) {
  const cardClass = cards === "never" ? "" : ` rs-table-cards--${cards}`;
  const dataMode = Array.isArray(columns) && Array.isArray(rows);

  return (
    <div className="rs-scroll-x" style={style}>
      <table className={`rs-table${cardClass} ${className}`.trim()}>
        {caption ? <caption style={{ textAlign: "left", padding: "0 0 8px", fontWeight: 600 }}>{caption}</caption> : null}
        {dataMode ? (
          <>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key} scope="col" className={c.numeric ? "rs-num" : undefined} style={c.width ? { width: c.width } : undefined}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: "center", opacity: 0.6, padding: 24 }}>
                    {empty}
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr
                    key={row[rowKey] ?? i}
                    data-clickable={onRowClick ? "true" : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        data-label={c.label || ""}
                        data-primary={c.primary ? "true" : undefined}
                        className={c.numeric ? "rs-num" : c.className}
                      >
                        {c.render ? c.render(row, i) : row[c.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </>
        ) : (
          children
        )}
      </table>
    </div>
  );
}
