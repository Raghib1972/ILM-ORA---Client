/* cnappAssets.js — src/assets/cnapp ki saari files */
const u = (m) =>
  (m && typeof m === "object" ? m.src || (m.default && (m.default.src || m.default)) : m) || "";

const media = require.context("@/assets/cnapp", false, /\.(mp4|webm|webp|jpe?g|png)$/i);
const all = media.keys().map((k) => ({ name: k.replace(/^\.\//, ""), url: u(media(k)) }));
const find = (s) => (all.find((f) => f.name.includes(s)) || {}).url || "";

export const HERO_VIDEO = find("6964235");
export const HERO_IMAGE = find("christian-velitchkov");
export const IMAGES = [
  find("fabio-oyXis2kALVg"),
  find("pexels-cookiecutter"),
  find("pexels-usehex"),
  find("adi-goldstein"),
];
export const VIDEOS = all
  .filter((f) => /\.(mp4|webm)$/i.test(f.name) && !f.name.includes("6964235"))
  .map((f) => f.url);

const logos = require.context("@/assets/cnapp/Logo", false, /\.(png|svg|webp|jpe?g)$/i);
export const LOGOS = {};
logos.keys().forEach((k) => {
  const name = k.replace(/^\.\//, "").replace(/\.[^.]+$/, "").toLowerCase();
  LOGOS[name] = u(logos(k));
});
