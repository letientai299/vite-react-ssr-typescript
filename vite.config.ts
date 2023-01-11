import { defineConfig, normalizePath, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";

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

function idmod(): Plugin {
  let root: string;

  const simplify = (id: string) => {
    return {
      shortId: id.replace(root, ""),
      isTSX: id.endsWith(".tsx"),
    };
  };

  return {
    name: "mod-id",

    config(config) {
      root = normalizePath(config.root + "/");
    },

    transform(src, id) {
      const { shortId, isTSX } = simplify(id);
      if (!isTSX) {
        return;
      }

      console.log("[mod-id]", shortId);
      src += `\n
export const MOD_ID = '${shortId}';
      `;
      return { code: src };
    },
  };
}
