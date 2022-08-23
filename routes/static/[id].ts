import { Handler } from "$fresh/server.ts";

export const handler: Handler = async (req, ctx) => {
  return new Response(
    await Deno.readTextFile(`./contents/${ctx.params.id}`),
    {
      headers: { "content-type": "application/typescript" },
    },
  );
};
