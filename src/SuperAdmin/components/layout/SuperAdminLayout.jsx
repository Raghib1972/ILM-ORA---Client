// "use client";

// // src/SuperAdmin/components/layout/SuperAdminLayout.jsx
// //
// // Next.js port: react-router's <Outlet /> (child route renders here) becomes
// // a `children` prop, since Next.js App Router passes nested route content as
// // children to the parent layout instead of using an outlet element — same
// // pattern used by AdminPanel/TrainerPanel/StudentPanel's Next.js ports.
// import React from "react";
// import SuperAdminNavbar from "./SuperAdminNavbar";
// import { useUserManagement } from "../../context/UserManagementContext";
// import { useTheme } from "../../context/ThemeContext";

// const SuperAdminLayout = ({ children }) => {
//   const { dark } = useTheme();

//   const { pendingApprovals, getStats } = useUserManagement();
//   const stats = (() => {
//     try { return getStats?.() || {}; } catch { return {}; }
//   })();

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: dark ? "#090910" : "#ffffff",
//       color: dark ? "#e2e8f0" : "#1e293b",
//     }}>
//       <SuperAdminNavbar
//         pendingCount={pendingApprovals?.length ?? 0}
//         activeUsers={stats.activeUsers ?? 0}
//       />

//       {/*
//         Desktop: paddingTop = 52px (Row1) + 44px (Row2) = 96px
//         Mobile:  paddingTop = 52px only (Row2 hidden)
//       */}
//       <main style={{ paddingTop: 96, minHeight: "100vh", boxSizing: "border-box" }}>
//         <style>{`
//           @media (max-width: 768px) {
//             main { padding-top: 52px !important; }
//           }
//         `}</style>
//         <div style={{ padding: 24 }}>
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SuperAdminLayout;


















"use client";

// // src/SuperAdmin/components/layout/SuperAdminLayout.jsx
// import React from "react";
// import { Outlet } from "react-router-dom";
// import SuperAdminNavbar from "./SuperAdminNavbar";
// import { useUserManagement } from "../../context/UserManagementContext";
// import { ThemeProvider, useTheme } from "../../context/ThemeContext";

// const LayoutInner = () => {
//   const { dark } = useTheme();

//   const { pendingApprovals, getStats } = useUserManagement();
//   const stats = (() => {
//     try { return getStats?.() || {}; } catch { return {}; }
//   })();

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: dark ? "#090910" : "#ffffff",
//       color: dark ? "#e2e8f0" : "#1e293b",
//     }}>
//       <SuperAdminNavbar
//         pendingCount={pendingApprovals?.length ?? 0}
//         activeUsers={stats.activeUsers ?? 0}
//       />

//       {/*
//         Desktop: paddingTop = 52px (Row1) + 44px (Row2) = 96px
//         Mobile:  paddingTop = 52px only (Row2 hidden)
//       */}
//       <main style={{ paddingTop: 96, minHeight: "100vh", boxSizing: "border-box" }}>
//         <style>{`
//           @media (max-width: 768px) {
//             main { padding-top: 52px !important; }
//           }
//         `}</style>
//         <div style={{ padding: 24 }}>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// const SuperAdminLayout = () => (
//   <ThemeProvider>
//     <LayoutInner />
//   </ThemeProvider>
// );

// export default SuperAdminLayout;




























// src/SuperAdmin/components/layout/SuperAdminLayout.jsx
//
// Next.js port: react-router's <Outlet /> (child route renders here) becomes
// a `children` prop, since Next.js App Router passes nested route content as
// children to the parent layout instead of using an outlet element — same
// pattern used by AdminPanel/TrainerPanel/StudentPanel's Next.js ports.
import React from "react";
import SuperAdminNavbar from "./SuperAdminNavbar";
import SuperAdminBottomNav from "./SuperAdminBottomNav";
import { useUserManagement } from "../../context/UserManagementContext";
import { useTheme } from "../../context/ThemeContext";

const SuperAdminLayout = ({ children }) => {
  const { dark } = useTheme();

  const { pendingApprovals, getStats } = useUserManagement();
  const stats = (() => {
    try { return getStats?.() || {}; } catch { return {}; }
  })();

  return (
    <div className="sa-shell" style={{
      background: dark ? "#090910" : "#ffffff",
      color: dark ? "#e2e8f0" : "#1e293b",
    }}>
      <SuperAdminNavbar
        pendingCount={pendingApprovals?.length ?? 0}
        activeUsers={stats.activeUsers ?? 0}
      />

      {/*
        Desktop: paddingTop = 52px (Row1) + 44px (Row2) = 96px
        Mobile:  paddingTop = 52px only (Row2 hidden)
      */}
      <main className="sa-main" style={{ paddingTop: "var(--nav-h, 96px)", boxSizing: "border-box" }}>
        <style>{`
          /* --nav-h = real header height (Row1 52px + Row2 44px on desktop,
             Row1 only below 1024px) + iPhone notch inset */
          .sa-shell { min-height: 100vh; min-height: 100dvh; --nav-h: calc(96px + env(safe-area-inset-top, 0px)); --bottom-nav-h: 0px; }
          .sa-main  { min-height: 100vh; min-height: 100dvh; min-width: 0; }

          @media (max-width: 1023px) {
            .sa-shell { --nav-h: calc(52px + env(safe-area-inset-top, 0px)); }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .sa-page { padding: 16px !important; }
          }
          @media (max-width: 767px) {
            .sa-shell { --bottom-nav-h: 60px; }
            .sa-main  { padding-bottom: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px)); }
            .sa-page  { padding: 12px !important; }
          }
          @media (min-width: 1920px) {
            .sa-page { max-width: 1680px; margin-left: auto; margin-right: auto; }
          }
        `}</style>
        <div className="sa-page" style={{ padding: 24 }}>
          {children}
        </div>
      </main>

      <SuperAdminBottomNav dark={dark} />
    </div>
  );
};

export default SuperAdminLayout;