// Next.js port of App.jsx's /superadmin route wrapper:
//   <Route path="/superadmin" element={
//     <ProtectedRoute>
//       <AuthProvider>
//         <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
//           <SaasProvider>
//             <UserManagementProvider>
//               <PermissionProvider>
//                 <SuperAdminLayout />
//               </PermissionProvider>
//             </UserManagementProvider>
//           </SaasProvider>
//         </RoleGuard>
//       </AuthProvider>
//     </ProtectedRoute>
//   }>
// Same guard, same allowed roles, same provider nesting order. Child routes
// render as `children` here (App Router's nested-layout mechanism) instead
// of via react-router's <Outlet />.
//
// Note: ThemeProvider (SuperAdmin/context/ThemeContext) is deliberately NOT
// nested here — it's already mounted once, globally, in
// components/AppProviders.jsx (see Task 6 notes there). Re-wrapping it here
// would just shadow the real theme state with a fresh, disconnected copy.
export const dynamic = "force-dynamic"; // guards read localStorage — see ProtectedRoute.jsx / RoleGuard.jsx

import ProtectedRoute from "@/components/ProtectedRoute";
import RoleGuard from "@/components/RoleGuard";
import SuperAdminLayout from "@/SuperAdmin/components/layout/SuperAdminLayout";
import { AuthProvider } from "@/SuperAdmin/context/AuthContext";
import { PermissionProvider } from "@/SuperAdmin/context/PermissionContext";
import { UserManagementProvider } from "@/SuperAdmin/context/UserManagementContext";
import { SaasProvider } from "@/SuperAdmin/context/SaasContext";

export default function SuperAdminRootLayout({ children }) {
  return (
    <ProtectedRoute>
      <AuthProvider>
        <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
          <SaasProvider>
            <UserManagementProvider>
              <PermissionProvider>
                <SuperAdminLayout>{children}</SuperAdminLayout>
              </PermissionProvider>
            </UserManagementProvider>
          </SaasProvider>
        </RoleGuard>
      </AuthProvider>
    </ProtectedRoute>
  );
}
