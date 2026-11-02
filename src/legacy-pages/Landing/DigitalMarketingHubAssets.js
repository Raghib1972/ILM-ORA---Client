/* ─────────────────────────────────────────────────────────────────────
   Digital Marketing Hub — images & videos
   Files are read straight from  src/assets/dmh/images  and  src/assets/dmh/video
   (i1…i11.jpg, i12.png, v1…v5.mp4). No /public folder needed.
───────────────────────────────────────────────────────────────────── */
import i1 from "../../assets/dmh/images/i1.jpg";
import i2 from "../../assets/dmh/images/i2.jpg";
import i3 from "../../assets/dmh/images/i3.jpg";
import i4 from "../../assets/dmh/images/i4.jpg";
import i5 from "../../assets/dmh/images/i5.jpg";
import i6 from "../../assets/dmh/images/i6.jpg";
import i7 from "../../assets/dmh/images/i7.jpg";
import i8 from "../../assets/dmh/images/i8.jpg";
import i9 from "../../assets/dmh/images/i9.jpg";
import i10 from "../../assets/dmh/images/i10.jpg";
import i11 from "../../assets/dmh/images/i11.jpg";
import i12 from "../../assets/dmh/images/i12.png";

const url = (m) => (typeof m === "string" ? m : m?.src || "");

export const IMG = {
  i1: url(i1), i2: url(i2), i3: url(i3), i4: url(i4), i5: url(i5), i6: url(i6),
  i7: url(i7), i8: url(i8), i9: url(i9), i10: url(i10), i11: url(i11), i12: url(i12),
};

const VIDEO_SRC = [
  new URL("../../assets/dmh/video/v1.mp4", import.meta.url).toString(),
  new URL("../../assets/dmh/video/v2.mp4", import.meta.url).toString(),
  new URL("../../assets/dmh/video/v3.mp4", import.meta.url).toString(),
  new URL("../../assets/dmh/video/v4.mp4", import.meta.url).toString(),
  new URL("../../assets/dmh/video/v5.mp4", import.meta.url).toString(),
];

const VIDEO_TEXT = [
  { title: "Plan with your team", desc: "Map goals, audience and channels on one table before you spend a rupee." },
  { title: "Teamwork behind every campaign", desc: "Strategy, creative and data people working as one group." },
  { title: "Present your strategy", desc: "Learn to explain a plan, its budget and its KPIs with confidence." },
  { title: "Build the plan on your desk", desc: "From notes and a laptop to a written, measurable campaign brief." },
  { title: "INNOVORA platform walkthrough", desc: "The real-world project that ties all 21 modules together." },
];

export const VIDEOS = VIDEO_TEXT.map((v, i) => ({ ...v, src: VIDEO_SRC[i] }));