/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies, setCookie } from "std/http/cookie.ts";
import { tw } from "@twind";
import { CONTENTS } from "../utils/contents.ts";
import { Example, parseExample } from "../utils/example.ts";
import { Footer } from "../components/Footer.tsx";

interface Data {
  examples: Example[];
  token: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const examples = await Promise.all(
      CONTENTS.map((id) =>
        Deno.readTextFile(`./contents/${id}.ts`)
          .then((text) => parseExample(id, text))
      ),
    );

    const token = getCookies(req.headers)["bot_token"] ?? "";
    return ctx.render({ examples, token });
  },
  async POST(req, ctx) {
    const examples = await Promise.all(
      CONTENTS.map((id) =>
        Deno.readTextFile(`./contents/${id}.ts`)
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
          <a
            href="https://grammy.dev"
            class={tw`text-grammy-500 hover:underline`}
          >
            grammY
          </a>{" "}
          is a framework for creating Telegram bots. It can be used from
          TypeScript and JavaScript and runs on Node.js, Deno, and in the
          browser.
        </p>
        <p class={tw`mt-6 text-gray-900`}>
          grammY by example is a collection of annotated examples to help
          beginners to get started with grammY, and the various features and
          plugins that comes with it. If you're looking for a well-explained
          complete guide, start reading grammY{" "}
          <a
            href="https://grammy.dev"
            class={tw`text-grammy-500 hover:underline`}
          >
            documentation
          </a>.
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

        <p class={tw`mt-6 text-gray-900`}>
          Bots can either be written in JavaScript or TypeScript. All code in
          these examples is written in TypeScript, but all the examples also
          work in JavaScript.
        </p>

        <p class={tw`mt-6 text-gray-900`}>
          As mentioned, grammY is powerful enough to run on Deno, Node and
          browser. All these example are written for the{" "}
          <a
            class={tw`text-grammy-500 hover:underline`}
            href="https://deno.land"
          >
            Deno
          </a>{" "}
          runtime. But by changing the imports here and there, these can easily
          run on Node.js as well.
        </p>

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
          browser! You can get one by chatting with the Father of all Telegram
          bots, the{"  "}
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
            class={tw`underline hover:text-grammy-500`}
          >
            Source
          </a>{" "}
          |{" "}
          <a
            href="https://github.com/dcdunkan/y-by-example/blob/main/LICENSE"
            class={tw`underline hover:text-grammy-500`}
          >
            License
          </a>{" "}
          | Based on{" "}
          <a
            href="https://examples.deno.land/"
            class={tw`underline hover:text-grammy-500`}
          >
            Deno by Example
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
