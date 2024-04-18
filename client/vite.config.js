/* eslint-disable no-undef */
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
//console.log(import.meta.VITE_BACKEND_URL, "jj")
export default defineConfig({
   
 build: {
  manifest: true,
  rollupOptions: {
    // overwrite default .html entry
    input: '/main.jsx'
  },
  
  outDir: "dist",
  
 },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': "http://localhost:5000",
    },
  },
})
