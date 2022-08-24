/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { CONTENTS } from "../utils/contents.ts";
import { Example, parseExample } from "../utils/example.ts";
import { Footer } from "../components/Footer.tsx";
import BotTokenInput from "../islands/BotTokenInput.tsx";
import { GrammyByExample } from "../components/Logos.tsx";

interface Data {
  examples: Example[];
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const examples = await Promise.all(
      CONTENTS.map((id) =>
        Deno.readTextFile(`./contents/${id}.ts`)
          .then((text) => parseExample(id, text))
      ),
    );
    return ctx.render({ examples });
  },
};

export default function IndexPage(props: PageProps<Data>) {
  const { examples } = props.data;
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
        <GrammyByExample />
        <p class={tw`mt-8 text-gray-900`}>
          <a
            href="https://grammy.dev"
            class={tw`text-grammy-500 hover:underline`}
          >
            grammY
          </a>{" "}
          is a framework for creating Telegram bots. It can be used from
          TypeScript and JavaScript and runs on both Deno and Node.js.
        </p>
        <p class={tw`mt-6 text-gray-900`}>
          grammY by example is a collection of annotated examples to help
          beginners get started with grammY, know about its various features and
          plugins available for it. If you're looking for a well-explained and
          complete guide, see the{" "}
          <a
            href="https://grammy.dev"
            class={tw`text-grammy-500 hover:underline`}
          >
            documentation
          </a>.
        </p>

        <ul class={tw`mt-6`}>
          {examples.map((example) => (
            <li class={tw`py-2`}>
              <a
                href={`/${example.id}`}
                class={tw`transition ease-in-out delay-50 hover:text-grammy-500 text-gray-900`}
              >
                <p class={tw`font-medium`}>{example.title}</p>
                <p class={tw`text-gray-500`}>{example.description}</p>
              </a>
            </li>
          ))}
        </ul>

        <p class={tw`mt-6 text-gray-900`}>
          Bots can be written in either JavaScript or TypeScript. All code in
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
        <label
          htmlFor="bot_token"
          class={tw`block mt-8 mb-2 font-medium text-gray-900`}
        >
          Bot token
        </label>
        <BotTokenInput />
        <p class={tw`mt-2 text-gray-500`}>
          If you provide one, you can run the examples directly from your
          browser! You can get one by talking to{"  "}
          <a
            href="https://telegram.me/BotFather"
            class={tw`text-grammy-500 hover:underline`}
          >
            @BotFather
          </a>.
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
