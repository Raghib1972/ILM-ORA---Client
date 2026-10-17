"use client";

import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000/api";

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("lms_token")}` },
});

// ── host (needs login) ──
export const createBookingPage = (data) =>
  axios.post(`${API_BASE}/booking-pages`, data, getAuthHeader());
export const getMyBookingPages = () =>
  axios.get(`${API_BASE}/booking-pages`, getAuthHeader());
export const updateBookingPage = (id, data) =>
  axios.put(`${API_BASE}/booking-pages/${id}`, data, getAuthHeader());
export const deleteBookingPage = (id) =>
  axios.delete(`${API_BASE}/booking-pages/${id}`, getAuthHeader());

// ── public (guest, no token). Separate instance so no auth interceptors apply. ──
const pub = axios.create({ baseURL: `${API_BASE}/public/booking` });

export const getPublicPage = (slug) => pub.get(`/pages/${slug}`);
export const getPublicDates = (slug, month, timezone) =>
  pub.get(`/pages/${slug}/dates`, { params: { month, timezone } });
export const getPublicSlots = (slug, date, timezone) =>
  pub.get(`/pages/${slug}/slots`, { params: { date, timezone } });
export const createBooking = (slug, body) =>
  pub.post(`/pages/${slug}/book`, body);
export const getBooking = (token) => pub.get(`/bookings/${token}`);
export const cancelBooking = (token, reason) =>
  pub.post(`/bookings/${token}/cancel`, { reason });
export const rescheduleBooking = (token, body) =>
  pub.post(`/bookings/${token}/reschedule`, body);

export const getMyBookings = (params) =>
  axios.get(`${API_BASE}/booking-pages/bookings`, {
    ...getAuthHeader(),
    params,
  });