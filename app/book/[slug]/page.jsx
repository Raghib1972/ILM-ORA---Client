import { Suspense } from "react";
import BookingPublicPage from "@/legacy-pages/booking/BookingPublicPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <BookingPublicPage />
    </Suspense>
  );
}