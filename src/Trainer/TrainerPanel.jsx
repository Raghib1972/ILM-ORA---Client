"use client";

// Next.js port of Trainer/TrainerPanel.jsx.
// react-router's <Outlet /> (child route renders here) becomes a `children`
// prop, since Next.js App Router passes nested route content as children to
// the parent layout instead of using an outlet element. Route-level guard
// (<ProtectedRoute><RoleGuard allowedRoles={["TRAINER","ADMIN"]}>...) is
// applied once at app/trainer/layout.jsx, same as App.jsx wrapped the
// <Route path="/trainer"> element — not duplicated here.
import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardLayout from "../layouts/DashboardLayout";

const TrainerPanel = ({ children }) => {
  return (
    <DashboardLayout SidebarComponent={Sidebar} label="Trainer panel">
      {children}
    </DashboardLayout>
  );
};

export default TrainerPanel;
