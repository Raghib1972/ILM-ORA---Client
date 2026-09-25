import "./globals.css";
import AppProviders from "@/components/AppProviders";

// SEO baseline reproduced from the existing index.html — nothing invented.
// Per-page metadata (title/description/OG/canonical overrides) is layered
// on top of this in Day 3; this is just the site-wide default.
export const metadata = {
  metadataBase: new URL("https://ilmora.texora.ai"),
  title: "ILM ORA - Intelligent Learning Management",
  description:
    "Master Product, Design, Growth & Marketing with live sessions from industry experts — powered by Texora AI.",
  keywords:
    "ILM ORA, online learning, live classes, product management course, UX design course, growth marketing course, Texora AI",
  authors: [{ name: "Texora Team" }],
  openGraph: {
    title: "ILM ORA – Learn. Grow. Lead.",
    description:
      "Master Product, Design, Growth & Marketing with live sessions from industry experts — powered by Texora AI.",
    url: "https://ilmora.texora.ai/",
    type: "website",
    images: [
      {
        url: "https://ilmora.texora.ai/og-icon.jpg",
        width: 512,
        height: 512,
        alt: "ILM ORA - Learn Product, Design, Growth & Marketing",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ILM ORA – Learn. Grow. Lead.",
    description:
      "Master Product, Design, Growth & Marketing with live sessions from industry experts — powered by Texora AI.",
    images: ["https://ilmora.texora.ai/og-icon.jpg"],
    creator: "@texoraai",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/favIcon/fav-icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favIcon/fav-icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favIcon/fav-icon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/images/favIcon/fav-icon-180.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Poppins — same <link>-based loading as the existing index.html
            (used for the ILM ORA text logo in the footer). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/*
          Theme pre-hydration — copied verbatim (logic-for-logic) from the
          existing index.html inline script. Runs before paint/hydration so
          there is no light/dark flash on refresh, matching current behavior
          exactly.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var isDark = localStorage.getItem("theme") === "dark";
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add("dark");
                    root.setAttribute("data-theme", "dark");
                  } else {
                    root.classList.remove("dark");
                    root.setAttribute("data-theme", "light");
                  }
                } catch (e) {
                  // localStorage unavailable — default to light, no-op
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "ILM ORA",
              url: "https://ilmora.texora.ai",
              logo: "https://ilmora.texora.ai/images/favIcon/fav-icon-180.png",
              description:
                "ILM ORA offers live, expert-led classes in Product, Design, Growth & Marketing — powered by Texora AI.",
              parentOrganization: {
                "@type": "Organization",
                name: "Texora AI",
                url: "https://texora.ai",
              },
              sameAs: [
                "https://www.linkedin.com/company/texora-ai",
                "https://twitter.com/texoraai",
                "https://www.instagram.com/texora_ai",
              ],
            }),
          }}
        />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
