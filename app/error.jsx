"use client";

// Styled to match the existing app's ErrorBoundary.jsx
// (src/components/ui/ErrorBoundary.jsx) exactly.
export default function Error({ reset }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "16px",
      }}
    >
      <p style={{ fontSize: "16px" }}>Something went wrong loading this page.</p>
      <button
        onClick={() => reset()}
        style={{
          padding: "8px 20px",
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Reload page
      </button>
    </div>
  );
}
