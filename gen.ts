import { join } from "https://deno.land/std@0.152.0/path/mod.ts";
try {
  await Deno.mkdir("static");
} catch (_err) {
  //
}
const files = [...Deno.readDirSync("contents")].map((v) => v.name);
for (const file of files) {
  const toPath = join("static", file);
  await Deno.copyFile(
    join("contents", file),
    toPath,
  );
  const content = await Deno.readTextFile(toPath);
  await Deno.writeTextFile(
    toPath,
    "// This file is generated. Do not edit.\n" +
      content.replace(/(\n)(bot\.start\(\);)/, "$1// $2") +
      "\nexport { bot };\n",
  );
}
