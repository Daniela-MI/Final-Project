import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./index.html"),
        admin: resolve(__dirname, "./admin.html"),
        cart: resolve(__dirname, "./cart.html"),
        details: resolve(__dirname, "./details.html"),
        contact: resolve(__dirname, "./contact.html"),
        home: resolve(__dirname, "./home.html"),
      },
    },
  },
});
