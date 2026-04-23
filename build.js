import esbuild from "esbuild";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url)));
const watch = process.argv.includes("--watch");

const options = {
  entryPoints: ["src/voltie-charger-card.js"],
  bundle: true,
  format: "esm",
  target: "es2020",
  outfile: "dist/voltie-charger-card.js",
  loader: { ".svg": "text" },
  define: { __VOLTIE_CARD_VERSION__: JSON.stringify(pkg.version) },
  legalComments: "none",
  minify: !watch,
  sourcemap: watch,
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  console.log("watching…");
} else {
  await esbuild.build(options);
}
