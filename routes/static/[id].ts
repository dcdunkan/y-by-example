import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (_req, ctx) => {
  let content = await Deno.readTextFile(`./contents/${ctx.params.id}`);
  const imports = content.split("\n").filter((v) => v.startsWith("import"));
  for (const i of imports) {
    content = content.replace(i, "");
  }
  content = "function getBot(token: string) {\n" + content;
  content = content.replace('"<REPLACE_BOT_TOKEN>"', "token");
  content = content.replace(
    /(\n)(bot\.start\(\);)/,
    "$1// $2",
  );
  content += "return bot;\n";
  content += "}\n\nexport { getBot };\n";
  content = imports.join("\n") + "\n" + content;
  return new Response(
    content,
    {
      headers: { "content-type": "application/typescript" },
    },
  );
};
