import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Preserve the original app's precached shell without the retired CRA/Workbox graph.
function offlineShell() {
  return {
    name: "offline-shell",
    apply: "build",
    async closeBundle() {
      const walk = async (directory) => {
        const entries = await readdir(directory, { withFileTypes: true });
        const files = await Promise.all(entries.map((entry) => {
          const path = join(directory, entry.name);
          return entry.isDirectory() ? walk(path) : [path];
        }));
        return files.flat();
      };
      const files = (await walk("build")).filter((file) => !file.endsWith("service-worker.js")).sort();
      const hash = createHash("sha256");
      for (const file of files) hash.update(file).update(await readFile(file));
      const worker = await readFile("service-worker.template.js", "utf8");
      await writeFile("build/service-worker.js", worker
        .replace("__CACHE_VERSION__", hash.digest("hex").slice(0, 16))
        .replace("__PRECACHE_FILES__", JSON.stringify(files.map((file) => file.slice(6)))));
    },
  };
}

export default defineConfig({
  plugins: [react(), offlineShell()],
  envPrefix: ["VITE_", "REACT_APP_"],
  define: { "process.env.PUBLIC_URL": JSON.stringify("") },
  build: { outDir: "build", target: "es2020" },
  test: { environment: "jsdom", globals: true, setupFiles: ["./src/setupTests.js"] },
});
