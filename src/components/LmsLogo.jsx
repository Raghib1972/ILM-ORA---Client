
import React from "react";

const LmsLogo = ({ size = "text-2xl" }) => {
  return (
    <div className="inline-flex flex-col items-center gap-2">
      {/* Icon + text pill */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/40 border border-white/15 shadow-[0_0_25px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        {/* gradient circle with subtle border */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center shadow-md border border-white/40">
          <span className="text-sm font-semibold text-white tracking-tight">
            L
          </span>
        </div>

        {/* L-M-S text */}
        <span
          className={`${size} font-semibold tracking-[0.35em] text-white drop-shadow`}
        >
          L-M-S
        </span>
      </div>

      {/* small caption under logo */}
      <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
        Learning Management System
      </p>
    </div>
  );
};

export default LmsLogo;

