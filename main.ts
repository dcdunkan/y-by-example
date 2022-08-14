/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import manifest from "./fresh.gen.ts";
import { InnerRenderFunction, RenderContext, start } from "fresh/server.ts";
import { setup } from "twind";
import { virtualSheet } from "twind/sheets";
import { config } from "utils/twind.ts";

import "https://esm.sh/prismjs@1.25.0/components/prism-jsx.js?no-check&pin=v55";
import "https://esm.sh/prismjs@1.25.0/components/prism-typescript.js?no-check&pin=v55";
import "https://esm.sh/prismjs@1.25.0/components/prism-tsx.js?no-check&pin=v55";

const sheet = virtualSheet();
sheet.reset();
setup({ ...config, sheet });

function render(ctx: RenderContext, render: InnerRenderFunction) {
  const snapshot = ctx.state.get("twind") as unknown[] | null;
  sheet.reset(snapshot || undefined);
  render();
  ctx.styles.splice(0, ctx.styles.length, ...(sheet).target);
  const newSnapshot = sheet.reset();
  ctx.state.set("twind", newSnapshot);
}

await start(manifest, { render });
