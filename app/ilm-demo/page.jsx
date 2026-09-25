// Next.js port of App.jsx's /ilm-demo route:
//   <Route path="/ilm-demo" element={<ProtectedRoute><IlmOraDemoPage /></ProtectedRoute>} />
// No RoleGuard on this route in the original app either — any authenticated
// role can land here (it's the shared post-login landing page).
export const dynamic = "force-dynamic"; // page reads localStorage/auth, same as the student pages

import ProtectedRoute from "@/components/ProtectedRoute";
import IlmOraDemoPage from "@/legacy-pages/Student/IlmOraDemoPage";

export default function Page() {
  return (
    <ProtectedRoute>
      <IlmOraDemoPage />
    </ProtectedRoute>
  );
}
