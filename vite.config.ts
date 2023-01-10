import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "build") {
    return {
      ...devConfig,
      ssr: {
        // Add your external dependencies here for the SSR build, otherwise,
        // the bundled won't have enough libraries to render noExternal:
        // [/@\w+\/*/],
      },
    };
  }

  return devConfig;
});

const devConfig = {
  // plugins: [react(), cssInjectedByJsPlugin()],
  plugins: [react()],

  build: {
    rollupOptions: {
      input: "./src/main.tsx",
      output: {
        manualChunks: undefined,
      },
    },
  },
};
