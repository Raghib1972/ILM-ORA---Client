// CommonJS format required by Next.js's webpack/postcss-loader pipeline
// (the existing Vite app uses an ESM export, which Vite loads natively —
// Next.js's loader does not, so this is the Next-equivalent, not a
// functional change: same single plugin, same Tailwind v4 setup).
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
