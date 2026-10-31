/* HR Hub router: keeps the route in memory so the URL stays /Hr-Hub */
const EV = "hrh-route";
let cur = "";

export const getHash = () => cur;

export const setHash = (v) => {
  const n = !v ? "" : v.charAt(0) === "#" ? v : "#" + v;
  if (n === cur) return;
  cur = n;
  window.dispatchEvent(new Event(EV));
};

export const onHash = (f) => {
  window.addEventListener(EV, f);
  return () => window.removeEventListener(EV, f);
};

/* old links like /Hr-Hub#/modules still open the right page, then the hash is removed from the URL */
export const initHash = () => {
  const h = window.location.hash || "";
  const legacy = h.indexOf("#/") === 0;
  cur = legacy ? h : "";
  if (legacy) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  window.dispatchEvent(new Event(EV));
};