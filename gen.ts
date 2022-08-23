import { join } from "https://deno.land/std@0.152.0/path/mod.ts";
try {
  await Deno.mkdir("static");
} catch (_err) {
  //
}
const files = [...Deno.readDirSync("contents")].map((v) => v.name);
for (const file of files) {
  const fromPath = join("contents", file);
  const toPath = join("static", file);
  const content = await Deno.readTextFile(fromPath);
  await Deno.writeTextFile(
    toPath,
    "// This file is generated. Do not edit.\n" +
      content.replace(/(\n)(bot\.start\(\);)/, "$1// $2") +
      "\nexport { bot };\n",
  );
}
