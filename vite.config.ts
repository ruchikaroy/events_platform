import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import mkcert from "vite-plugin-mkcert";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  }, // Not needed for Vite 5+
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
});
