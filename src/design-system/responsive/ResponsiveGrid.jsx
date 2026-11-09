"use client";

// Auto-fit grid. No breakpoints: columns appear/disappear by available width.
//   <ResponsiveGrid min={220}> <Card/> <Card/> ... </ResponsiveGrid>
// min = narrowest a column may get (px). gap = px or any CSS length.
import React from "react";

export default function ResponsiveGrid({ min = 240, gap, as: Tag = "div", className = "", style, children, ...rest }) {
  const vars = { "--rs-min": `${min}px` };
  if (gap !== undefined) vars["--rs-gap"] = typeof gap === "number" ? `${gap}px` : gap;
  return (
    <Tag className={`rs-grid ${className}`.trim()} style={{ ...vars, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
