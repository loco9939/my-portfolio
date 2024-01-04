import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" },
    ],
  },
  // NOTE: Vite에서 MUI 설치 후 오류 발생 해결
  optimizeDeps: {
    include: ["@emotion/styled"],
  },
});
