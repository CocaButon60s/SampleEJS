import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        hello: resolve(__dirname, "src/client/hello/hello.js"),
        index: resolve(__dirname, "index.html"),
      },
    },
  },
});
