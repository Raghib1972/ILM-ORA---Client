// Next.js port of App.jsx's nested SuperAdmin fallback route:
//   <Route path="*" element={<Navigate to="/login" replace />} />
// (nested inside the /superadmin route block — any /superadmin/* subpath
// that doesn't match one of the explicit routes above falls through here.)
// Explicit routes always win over this catch-all in the App Router, same
// as react-router matches more specific routes before the wildcard.
import { redirect } from "next/navigation";

export default function SuperAdminCatchAll() {
  redirect("/login");
}
