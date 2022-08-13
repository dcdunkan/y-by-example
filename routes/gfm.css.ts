import { CSS, Handlers } from "../deps.ts";

export const handler: Handlers = {
  GET() {
    return new Response(CSS, {
      status: 200,
      headers: {
        "content-type": "text/css; charset: utf-8",
      },
    });
  },
};
