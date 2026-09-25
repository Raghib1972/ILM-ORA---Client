// Next.js port of App.jsx's /admin route wrapper:
//   <Route path="/admin" element={<ProtectedRoute><RoleGuard allowedRoles={["ADMIN"]}><AdminPanel /></RoleGuard></ProtectedRoute>}>
// Same guard, same allowed roles, same panel shell. Child routes render as
// `children` here (App Router's nested-layout mechanism) instead of via
// react-router's <Outlet />.
export const dynamic = "force-dynamic"; // guards read localStorage — see ProtectedRoute.jsx / RoleGuard.jsx

import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";
import AdminPanel from "@/Admin/AdminPanel";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["ADMIN"]}>
        <AdminPanel>{children}</AdminPanel>
      </RoleGuard>
    </ProtectedRoute>
  );
}
