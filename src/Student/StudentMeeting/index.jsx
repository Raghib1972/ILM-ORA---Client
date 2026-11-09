"use client";

import React from "react";
import WorkspaceApp from "./pages/WorkspaceApp";
import { ToastProvider } from "./components/Toast";
import "./workspace-styles.css";

export default function StudentMeeting({ theme, mode = "workspace" } = {}) {
  return (
    <ToastProvider>
      <WorkspaceApp theme={theme} mode={mode} />
    </ToastProvider>
  );
}