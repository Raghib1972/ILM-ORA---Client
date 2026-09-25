// Next.js port of App.jsx's /student route wrapper:
//   <Route path="/student" element={<ProtectedRoute><RoleGuard allowedRoles={["STUDENT","ADMIN"]}><StudentPanel /></RoleGuard></ProtectedRoute>}>
// Same guard, same allowed roles, same panel shell. Child routes render as
// `children` here (App Router's nested-layout mechanism) instead of via
// react-router's <Outlet />.
export const dynamic = "force-dynamic"; // guards read localStorage — see ProtectedRoute.jsx / RoleGuard.jsx

import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";
import StudentPanel from "@/Student/StudentPanel";

export default function StudentLayout({ children }) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["STUDENT", "ADMIN"]}>
        <StudentPanel>{children}</StudentPanel>
      </RoleGuard>
    </ProtectedRoute>
  );
}
