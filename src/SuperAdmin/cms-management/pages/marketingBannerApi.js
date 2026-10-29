// src/SuperAdmin/pages/cms/marketingBannerApi.js
//
// API client for the CMS "Marketing Banner" module.
// All calls go through the API Gateway:  <API_BASE>/api/cms/marketing-banner/**
//
// >>> ADJUST THESE TWO IF YOUR PROJECT USES DIFFERENT CONVENTIONS <<<
//  1) API_BASE        – env var holding the gateway origin (empty string = same origin / Next.js rewrite)
//  2) getAuthToken()  – where your app keeps the SUPER_ADMIN JWT after login

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:9000/api"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

export const API_URL = `${API_BASE}/api/cms/marketing-banner`;

const TOKEN_STORAGE_KEY = "lms_token";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
};

/** Logo URLs returned by the backend are relative ("/api/cms/..."); make them loadable by <img>. */
export const resolveAssetUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${API_BASE}${url}`;
  return url;
};

/** True when the URL points to a logo uploaded through this module. */
export const isUploadedLogo = (url) =>
  typeof url === "string" && /^\/api\/cms\/marketing-banner\/logo\/\d+$/.test(url);

async function request(path, { method = "GET", body, formData } = {}) {
  const headers = {};
  const token = getAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload;
  if (formData) {
    payload = formData; // browser sets the multipart boundary itself
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new Error("Cannot reach the server. Please check your connection and try again.");
  }

  if (res.status === 204) return null;

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON body */
  }

  if (!res.ok) {
    let msg = data?.message;
    if (!msg) {
      if (res.status === 401) msg = "Your session has expired. Please log in again.";
      else if (res.status === 403) msg = "You do not have permission to manage banners.";
      else if (res.status === 413) msg = "Image must be smaller than 1 MB.";
      else if (res.status === 429) msg = "Too many requests. Please wait a moment and try again.";
      else msg = `Request failed (${res.status}).`;
    }
    throw new Error(msg);
  }
  return data;
}

// Only fields the backend accepts (never send id / timestamps).
const toPayload = (f) => ({
  enabled: !!f.enabled,
  logoUrl: f.logoUrl || "",
  logoAlt: f.logoAlt || "",
  headline: f.headline,
  description: f.description || "",
  buttonText: f.buttonText,
  buttonLink: f.buttonLink,
  openInNewTab: !!f.openInNewTab,
  dismissible: !!f.dismissible,
});

export const listBanners = () => request("");
export const createBanner = (form) => request("", { method: "POST", body: toPayload(form) });
export const updateBanner = (id, form) => request(`/${id}`, { method: "PUT", body: toPayload(form) });
export const setBannerStatus = (id, enabled) =>
  request(`/${id}/status`, { method: "PATCH", body: { enabled } });
export const deleteBanner = (id) => request(`/${id}`, { method: "DELETE" });

/** Uploads the logo as multipart/form-data; resolves to { url, assetId, contentType, sizeBytes }. */
export const uploadLogo = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return request("/upload-logo", { method: "POST", formData: fd });
};
