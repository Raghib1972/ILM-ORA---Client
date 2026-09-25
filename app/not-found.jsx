import Link from "next/link";

export default function NotFound() {
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
      <p style={{ fontSize: "16px" }}>Page not found.</p>
      <Link
        href="/"
        style={{
          padding: "8px 20px",
          background: "#3b82f6",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
