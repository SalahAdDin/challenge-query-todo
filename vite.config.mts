import path from "path";

import million from "million/compiler";
import { loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv) => {
  process.env = {
    ...process.env,
    ...loadEnv(configEnv.mode, process.cwd(), "VITE_"),
  };

  return defineConfig({
    base: process.env.VITE_APP_BASE_URL,
    plugins: [million.vite({ auto: true }), react()],
    css: {
      devSourcemap: true,
    },
    build: { sourcemap: true },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@application": path.resolve(__dirname, "src/application"),
        "@domain": path.resolve(__dirname, "src/domain"),
        "@infrastructure": path.resolve(__dirname, "src/infrastructure"),
        "@presentation": path.resolve(__dirname, "src/presentation"),
      },
    },
    test: {
      globals: true,
      clearMocks: true,
      css: true,
      include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
      exclude: ["tests"],
      watch: false,
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
        exclude: [
          "src/application/utils/test-utils.tsx",
          "playwright.config.ts",
          "playwright-report",
          "postcss.config.cjs",
          "tailwind.config.ts",
          "tests",
          "vite.config.mts",
        ],
        thresholds: {
          branches: 90,
          functions: 95,
          lines: 80,
          statements: 80,
        },
      },
      passWithNoTests: true,
      environment: "happy-dom",
      setupFiles: "./src/vitest.setup.ts",
    },
    server: {
      open: true,
      host: process.env.VITE_SERVER_HOST,
      port: Number(process.env.VITE_SERVER_PORT),
    },
  });
};
