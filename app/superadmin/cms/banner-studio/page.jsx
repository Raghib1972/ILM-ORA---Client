export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import BannerStudioPage from "@/SuperAdmin/cms-management/banner-studio/pages/BannerStudioPage";

export default function Page() {
  return <BannerStudioPage />;
}
