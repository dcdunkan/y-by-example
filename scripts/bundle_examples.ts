import { bundle } from "deno_emit";
import { CONTENTS } from "../utils/contents.ts";

await Deno.mkdir("./static/bundled", { recursive: true });

for (const example of CONTENTS) {
  let content = await Deno.readTextFile(`./contents/${example}.ts`);
  const imports = content.split("\n").filter((v) => v.startsWith("import"));
  for (const i of imports) content = content.replace(i, "");
  content = "function getBot(token: string) {\n" + content;
  content = content.replace('"BOT_TOKEN"', "token");
  content = content.replace(
    /(\n)(bot\.start\(\);)/,
    "$1// $2",
  );
  content += "return bot;\n";
  content += "}\n\nexport { getBot };\n";
  content = imports.join("\n") + "\n" + content;

  const tmp = await Deno.makeTempFile({ suffix: ".ts" });
  await Deno.writeTextFile(tmp, content);
  const bundled = await bundle(tmp);
  await Deno.remove(tmp);
  await Deno.writeTextFile(`./static/bundled/${example}.js`, bundled.code);
  console.log(`[Bundle] ${example}.ts`);
}
