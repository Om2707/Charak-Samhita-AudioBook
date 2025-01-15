import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, 
  },
  build: {
    outDir: 'dist', 
    sourcemap: false, 
  },
  define: {
    'import.meta.env': {
      VITE_API_BASE_URL: process.env.VITE_API_BASE_URL || '',
    },
  },
  esbuild: {
    drop: ['console', 'debugger'], 
  },
});
