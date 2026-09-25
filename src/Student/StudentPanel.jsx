"use client";

// Next.js port of Student/StudentPanel.jsx.
// react-router's <Outlet /> (child route renders here) becomes a `children`
// prop, since Next.js App Router passes nested route content as children to
// the parent layout instead of using an outlet element.
//
// The original also wrapped an inner <RoleGuard allowedRole="student">, but
// RoleGuard's actual prop is `allowedRoles` (array) - `allowedRole` (singular)
// was never read, so that guard was already a no-op in the live app; the
// real enforcement came from App.jsx's route-level
// <RoleGuard allowedRoles={["STUDENT","ADMIN"]}> wrapping this panel. That
// same enforcement is now done once, at app/student/layout.jsx, so it isn't
// duplicated (inertly) here.
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import Sidebar from "../components/Sidebar";

export default function StudentPanel({ children }) {
  return (
    <DashboardLayout SidebarComponent={Sidebar} label="Student panel">
      {children}
    </DashboardLayout>
  );
}
