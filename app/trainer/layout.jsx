// Next.js port of App.jsx's /trainer route wrapper:
//   <Route path="/trainer" element={<ProtectedRoute><RoleGuard allowedRoles={["TRAINER","ADMIN"]}><TrainerPanel /></RoleGuard></ProtectedRoute>}>
// Same guard, same allowed roles, same panel shell. Child routes render as
// `children` here (App Router's nested-layout mechanism) instead of via
// react-router's <Outlet />.
export const dynamic = "force-dynamic"; // guards read localStorage — see ProtectedRoute.jsx / RoleGuard.jsx

import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";
import TrainerPanel from "@/Trainer/TrainerPanel";

export default function TrainerLayout({ children }) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["TRAINER", "ADMIN"]}>
        <TrainerPanel>{children}</TrainerPanel>
      </RoleGuard>
    </ProtectedRoute>
  );
}
