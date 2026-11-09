"use client";

// Responsive wrapper for Recharts. IMPORT BY DEEP PATH (not from the barrel,
// so recharts isn't pulled into every page that imports "@/design-system"):
//   import ChartFrame from "@/design-system/components/responsive/ChartFrame";
//
//   <ChartFrame>
//     {({ compact }) => (
//       <LineChart data={data}>
//         <XAxis dataKey="d" interval={compact ? "preserveStartEnd" : 0} tick={{ fontSize: compact ? 10 : 12 }} />
//         ...
//       </LineChart>
//     )}
//   </ChartFrame>
//
// Height: 220px on phones, 320px otherwise (override with height / heightCompact / heightRegular).
import React from "react";
import { ResponsiveContainer } from "recharts";
import { useBreakpoint } from "../../hooks/useMediaQuery";

export default function ChartFrame({ height, heightCompact = 220, heightRegular = 320, className = "", style, children }) {
  const { lt } = useBreakpoint();
  const compact = lt("md");
  const h = height ?? (compact ? heightCompact : heightRegular);
  return (
    <div className={`rs-chart ${className}`.trim()} style={{ height: h, ...style }}>
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: h }}>
        {typeof children === "function" ? children({ compact }) : children}
      </ResponsiveContainer>
    </div>
  );
}
