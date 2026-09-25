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
import { useUserManagement } from "../../context/UserManagementContext";
import { useTheme } from "../../context/ThemeContext";

const SuperAdminLayout = ({ children }) => {
  const { dark } = useTheme();

  const { pendingApprovals, getStats } = useUserManagement();
  const stats = (() => {
    try { return getStats?.() || {}; } catch { return {}; }
  })();

  return (
    <div style={{
      minHeight: "100vh",
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
      <main style={{ paddingTop: 96, minHeight: "100vh", boxSizing: "border-box" }}>
        <style>{`
          @media (max-width: 768px) {
            main { padding-top: 52px !important; }
          }
        `}</style>
        <div style={{ padding: 24 }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLayout;