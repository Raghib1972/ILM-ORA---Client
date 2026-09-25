"use client";

// Next.js port of Admin/AdminPanel.jsx.
// react-router's <Outlet /> (child route renders here) becomes a `children`
// prop, since Next.js App Router passes nested route content as children to
// the parent layout instead of using an outlet element. Route-level guard
// (<ProtectedRoute><RoleGuard allowedRoles={["ADMIN"]}>...) is applied once
// at app/admin/layout.jsx, same as App.jsx wrapped the <Route path="/admin">
// element — not duplicated here.
import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardLayout from "../layouts/DashboardLayout";

const AdminPanel = ({ children }) => {
  return (
    <DashboardLayout SidebarComponent={Sidebar} label="Admin panel">
      {children}
    </DashboardLayout>
  );
};

export default AdminPanel;
