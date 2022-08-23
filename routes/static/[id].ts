import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (req, ctx) => {
  return new Response(
    (await Deno.readTextFile(`./contents/${ctx.params.id}`)).replace(
      /(\n)(bot\.start\(\);)/,
      "$1// $2",
    ) + "\nexport { bot };\n",
    {
      headers: { "content-type": "application/typescript" },
    },
  );
};
