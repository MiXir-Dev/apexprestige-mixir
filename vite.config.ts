import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import sitemapPlugin from "vite-plugin-sitemap";
import {
  INDEXABLE_SERVICE_AREA_SLUGS,
  SERVICE_AREAS,
} from "./src/consts/service-areas";
import { PRIVACY_PATH, QUOTE_PATH } from "./src/consts/paths";
import { netlifyFunctionsDev } from "./scripts/netlify-functions-dev";

const resolvedPort = Number(process.env.VITE_PORT ?? "8080");
const devPort = Number.isFinite(resolvedPort) ? resolvedPort : 8080;
const indexableServiceAreaPaths = SERVICE_AREAS.filter((area) =>
  INDEXABLE_SERVICE_AREA_SLUGS.includes(area.slug)
).map((area) => area.path);

export default defineConfig(({ mode }) => {
  const serverEnvironment = loadEnv(mode, process.cwd(), "TELEGRAM_");
  Object.assign(process.env, serverEnvironment);

  return {
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  server: {
    host: "::",
    port: devPort,
  },
  plugins: [
    react(),
    netlifyFunctionsDev(),
    sitemapPlugin({
      hostname: "https://www.apexprestige.ca",
      dynamicRoutes: [
        QUOTE_PATH,
        PRIVACY_PATH,
        ...indexableServiceAreaPaths,
      ],
      changefreq: "monthly",
      priority: 0.7,
      readable: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
