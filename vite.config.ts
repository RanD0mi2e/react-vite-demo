import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
    proxy: {
      '/dev': {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => {
          console.log("path", path.replace(/^\/dev/, ""));
          return path.replace(/^\/dev/, "");
        },
      },
    },
  },
});
