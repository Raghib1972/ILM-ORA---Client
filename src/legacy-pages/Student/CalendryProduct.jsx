"use client";

import StudentMeeting from "../../Student/StudentMeeting/index.jsx";

// Calendry product: Booking Pages, Calendar, Calendar Sync, Availability only.
export default function CalendryProduct(props) {
  return <StudentMeeting {...props} mode="calendar" />;
}