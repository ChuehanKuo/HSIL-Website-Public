import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { imagetools } from "vite-imagetools";
import { notoSubset } from "./build/noto-subset";
import { routeHtml } from "./build/route-html";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    // Each photo import carries its own widths/formats (sized to where it renders);
    // see src/components/Picture.tsx.
    imagetools(),
    notoSubset(),
    routeHtml(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Preserve the original browser support when upgrading Vite's default build target.
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    rollupOptions: {
      output: {
        // Only the React core is pinned to a shared chunk. Animation libraries are
        // left to Rollup's route-based splitting: a manual "animation" group made
        // the front door preload GSAP, which only the lazy /2026 archive uses.
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
}));
