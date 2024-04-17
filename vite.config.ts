import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Define a base in preparation for deploying to GitHub Pages.
  // Reference: https://vitejs.dev/guide/static-deploy#github-pages
  base: "/nmdc-deployment-dashboard/",
});
