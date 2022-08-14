import { CSS } from "gfm";
import { Handlers } from "fresh/server.ts";

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
