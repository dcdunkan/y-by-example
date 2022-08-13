/** @jsx h */
/** @jsxFrag Fragment */

import {
  Fragment,
  getCookies,
  h,
  Handlers,
  Head,
  PageProps,
  setCookie,
  tw,
} from "../deps.ts";
import { TOC } from "../utils/toc.ts";
import { Example, parseExample } from "../utils/example.ts";
import { Footer } from "../components/Footer.tsx";

interface Data {
  examples: Example[];
  token: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const examples = await Promise.all(
      TOC.map((id) =>
        Deno.readTextFile(`./data/${id}.ts`)
          .then((text) => parseExample(id, text))
      ),
    );

    const token = getCookies(req.headers)["bot_token"] ?? "";
    return ctx.render({ examples, token });
  },
  async POST(req, ctx) {
    const examples = await Promise.all(
      TOC.map((id) =>
        Deno.readTextFile(`./data/${id}.ts`)
          .then((text) => parseExample(id, text))
      ),
    );

    const token = (await req.formData()).get("bot_token");

    if (token) {
      const response = await ctx.render({ examples, token: token.toString() });
      setCookie(response.headers, {
        name: "bot_token",
        value: token.toString(),
      });
      return response;
    }

    return new Response(undefined, {
      headers: { location: `/` },
      status: 200,
    });
  },
};

export default function IndexPage(props: PageProps<Data>) {
  const { examples, token } = props.data;

  return (
    <>
      <Head>
        <title>grammY by example</title>
        <meta
          name="description"
          content="grammY by example is a collection of annotated examples for how to use grammY, and the various features it provides."
        />
      </Head>

      <main class={tw`mt-10 p-4 mx-auto max-w-screen-md`}>
        <h1 class={tw`select-none`}>
          <span class={tw`text(5xl gray-900) tracking-tight font-bold`}>
            grammY
          </span>
          <br />
          <span
            class={tw`text(3xl gray-700) tracking-tight italic font-medium`}
          >
            by example
          </span>
        </h1>
        <p class={tw`mt-8 text-gray-900`}>
          grammY is a framework for creating Telegram bots. It can be used from
          TypeScript and JavaScript and runs on Node.js, Deno, and in the
          browser.
        </p>
        <p class={tw`mt-6 text-gray-900`}>
          <b class={tw`bold`}>grammY by example</b>{" "}
          is a collection of annotated examples for how to use grammY, and the
          various features it provides. It acts as a reference for how to do
          various things in grammY. Here are few examples that can help you to
          get started with grammY. Good luck!
        </p>

        <ul class={tw`mt-6 text-gray-900`}>
          {examples.map((example) => (
            <li>
              <a href={`/${example.id}`} class={tw`underline`}>
                {example.title}
              </a>
            </li>
          ))}
        </ul>

        <form method="POST">
          <label
            htmlFor="bot_token"
            class={tw`block mt-8 mb-2 font-medium text-gray-900`}
          >
            Bot Token
          </label>
          <div class={tw`flex align-center`}>
            <input
              type="text"
              id="bot_token"
              name="bot_token"
              class={tw`bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-grammy-500 focus:border-grammy-500 w-full p-2.5`}
              placeholder="123456:ABCdef"
              value={token}
            />
            <button
              type="submit"
              class={tw`text-white bg-grammy-500 ml-2 hover:bg-grammy-500 focus:ring-4 focus:outline-none focus:ring-grammy-500 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center`}
            >
              Save
            </button>
          </div>
        </form>
        <p class={tw`mt-2 text-gray-500`}>
          If you provide one, you can run the examples directly from your
          browser! You can get one by chatting with{" "}
          <a
            href="https://telegram.me/BotFather"
            class={tw`text-grammy-500 hover:underline`}
          >
            BotFather
          </a>{" "}
          on Telegram.
        </p>

        <p class={tw`mt-12 text-gray-500`}>
          <a
            href="https://github.com/dcdunkan/y-by-example"
            class={tw`underline`}
          >
            Source
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/dcdunkan/y-by-example/blob/main/LICENSE"
            class={tw`underline`}
          >
            License
          </a>{" "}
          | Based on{" "}
          <a href="https://examples.deno.land/" class={tw`underline`}>
            Deno by Example
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
