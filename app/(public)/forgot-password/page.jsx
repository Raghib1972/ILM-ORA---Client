export const dynamic = "force-dynamic"; // localStorage-dependent render

import ForgotPassword from "@/legacy-pages/Auth/ForgotPassword";

export const metadata = {
  title: "Forgot Password | ILM ORA",
  // Session/auth-specific pages: not meant to be indexed.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ForgotPassword />;
}