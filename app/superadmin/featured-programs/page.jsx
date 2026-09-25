export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import FeaturedProgramsList from "@/SuperAdmin/featured-programs/pages/FeaturedProgramsList";

export default function Page() {
  return <FeaturedProgramsList />;
}
