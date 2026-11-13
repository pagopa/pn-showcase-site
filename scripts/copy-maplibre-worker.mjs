import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

const sourceDirectory = path.join(
  path.dirname(require.resolve("maplibre-gl/package.json")),
  "dist",
);

const destinationDirectory = path.join(projectRoot, "public", "maplibre");

mkdirSync(destinationDirectory, { recursive: true });

for (const filename of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  copyFileSync(
    path.join(sourceDirectory, filename),
    path.join(destinationDirectory, filename),
  );
}
