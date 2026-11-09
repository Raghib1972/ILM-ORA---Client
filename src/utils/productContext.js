const KEY = "ilmora_selected_product";
const PATH_TO_PRODUCT = { "/workspace": "workspace", "/calendry": "calendar" };

export function rememberProductFromPath(pathname) {
  try {
    const p = (pathname || window.location.pathname || "").replace(/\/+$/, "");
    const product = PATH_TO_PRODUCT[p];
    if (product) sessionStorage.setItem(KEY, product);
    else sessionStorage.removeItem(KEY);
  } catch {}
}

// Key ab yahan delete nahi hoti — IlmOraDemoPage backend ko bhejne ke baad delete karega
export function consumeProductRoute(role, fallback) {
  try {
    const product = sessionStorage.getItem(KEY);
    if (product && (role || "").toUpperCase() !== "SUPER_ADMIN") return "/onboarding";
  } catch {}
  return fallback;
}

export function peekRememberedProduct() {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function clearRememberedProduct() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}

// Purana export (PublicLayout import karta hai). Ab sirf no-op hai, kyunki backend sync
// IlmOraDemoPage karta hai.
export function applyRememberedProduct() {}