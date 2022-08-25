/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import Prism from "prism";
import "https://esm.sh/prismjs@1.25.0/components/prism-typescript.js?no-check&pin=v55";
import { CircleArrow, Loading, Start } from "../components/Icons.tsx";
import { Footer } from "../components/Footer.tsx";
import { Example, ExampleSnippet, parseExample } from "../utils/example.ts";
import { CONTENTS } from "../utils/contents.ts";
import RunButton from "../islands/RunButton.tsx";
import { VERSIONS } from "../utils/versions.ts";

interface Data {
  example: Example;
  prev: Example | null;
  next: Example | null;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    let id = ctx.params.id;
    let endsWithTS = false;
    if (id.endsWith(".ts")) {
      endsWithTS = true;
      id = id.slice(0, -3);
    }

    // Load the current, previous, and next example
    let example: Example;
    let prev: Example | null;
    let next: Example | null;
    try {
      const cur = CONTENTS.indexOf(id);
      const prevId = CONTENTS[cur - 1];
      const nextId = CONTENTS[cur + 1];
      const [data, prevData, nextData] = await Promise.all(
        [id, prevId, nextId].map((name) =>
          name
            ? Deno.readTextFile(`./contents/${name}.ts`)
            : Promise.resolve("")
        ),
      );
      example = parseExample(id, data);
      prev = prevData ? parseExample(prevId, prevData) : null;
      next = nextData ? parseExample(nextId, nextData) : null;
    } catch (e) {
      if (e instanceof Deno.errors.NotFound) {
        return new Response("404 Example Not Found", { status: 404 });
      }
      throw e;
    }

    // If the example was loaded with a .ts extension, we'll serve the raw
    // source code.
    if (endsWithTS) {
      const accept = req.headers.get("accept") || "";
      const acceptsHTML = accept.includes("text/html");
      if (example.files.length > 1) {
        return new Response(
          "Source for multi file examples can not be viewed",
          {
            status: 400,
          },
        );
      }

      const file = example.files[0];

      let code = `let __BOT_TOKEN__ = prompt("Enter your Bot Token:");
if (!__BOT_TOKEN__) throw new Error("Invalid bot token.");\n\n`;

      for (const snippet of file.snippets) {
        code += snippet.code + "\n";
      }

      code = code.replace(/"BOT_TOKEN"/g, "__BOT_TOKEN__");
      code = code.replace(
        /https:\/\/deno\.land\/x\/grammy(|@v\d+.\d+.\d+)\/(.+)/g,
        `https://deno.land/x/grammy@${VERSIONS.grammy}/$2`,
      );

      return new Response(code, {
        headers: {
          "content-type": acceptsHTML
            ? "text/plain; charset=utf-8"
            : "application/typescript; charset=utf-8",
        },
      });
    }

    // Otherwise, we'll render the example.
    return ctx.render({ example, prev, next });
  },
};

export default function ExamplePage(props: PageProps<Data>) {
  const { example, prev, next } = props.data;

  if (!example) {
    return <div>404 Example Not Found</div>;
  }

  const url = `${props.url.origin}${props.url.pathname}.ts`;

  const description = (example.description || example.title) +
    " — grammY by example is a collection of annotated examples to help beginners get started with grammY, and the various features and plugins that comes with it.";

  return (
    <>
      <Head>
        <title>{example.title} - grammY by example</title>
        <link rel="stylesheet" href="/gfm.css" />
        <meta name="description" content={description} />
      </Head>
      <main class={tw`max-w-screen-lg mt-6 mx-auto p-4`}>
        <h4 class={tw`text-gray-500`}>
          <a class={tw`hover:underline hover:text-grammy-500`} href="/">
            Examples
          </a>
          {" /"}
        </h4>

        <div class={tw`flex items-center gap-2.5`}>
          <h1 class={tw`mt-2 text-3xl font-bold`}>
            {example.title}
          </h1>
          <RunButton id={props.params.id} />
        </div>

        {example.description && (
          <div class={tw`mt-1`}>
            <p class={tw`text-gray-500`}>
              {example.description}
            </p>
          </div>
        )}

        {example.introduction && (
          <div class={tw`mt-4`}>
            <p class={tw`text-gray-700`}>
              {example.introduction}
            </p>
          </div>
        )}

        {example.files.map((file) => (
          <div class={tw`mt-5`}>
            {file.snippets.map((snippet, i) => (
              <SnippetComponent
                key={i}
                firstOfFile={i === 0}
                lastOfFile={i === file.snippets.length - 1}
                filename={file.name}
                snippet={snippet}
              />
            ))}
          </div>
        ))}

        {example.conclusion && (
          <div class={tw`mt-4`}>
            <p class={tw`text-gray-700`}>
              {example.conclusion}
            </p>
          </div>
        )}

        <div class={tw`grid grid-cols-1 sm:grid-cols-5 gap-x-6`}>
          <div class={tw`col-span-2 mt-8`} />
          <div class={tw`col-span-3 mt-8`}>
            {example.deno_cli && (
              <>
                <p class={tw`text-gray-700`}>
                  Run{" "}
                  <a
                    href={url}
                    class={tw`hover:underline hover:text-grammy-500 focus:underline`}
                  >
                    this example
                  </a>{" "}
                  locally using the Deno CLI:
                </p>
                <pre
                  class={tw`mt-2 bg-gray-100 p-4 overflow-x-auto text-sm select-all rounded-md`}
                >
                  deno run --allow-net {example.deno_cli.replace("<url>", url)}
                </pre>
              </>
            )}

            {example.deno_pg && (
              <div class={tw`col-span-3 mt-8`}>
                <p class={tw`text-gray-700`}>
                  Try this example in a Deno Deploy playground:
                </p>
                <p class={tw`mt-3`}>
                  <a
                    class={tw`py-2 px-4 border-solid border-2 border-black-500 text-black-500 hover:bg-grammy-500 hover:border-grammy-500 hover:text-white transition ease-in-out duration-250 inline-block text-sm rounded-md opacity-90`}
                    href={example.deno_pg}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Go to playground
                  </a>
                </p>
              </div>
            )}

            {example.stackblitz && (
              <div class={tw`col-span-3 mt-8`}>
                <p class={tw`text-gray-700`}>
                  Try this example in Stackblitz:
                </p>
                <p class={tw`mt-3`}>
                  <a
                    class={tw`py-2 px-4 border-solid border-2 border-black-500 text-black-500 hover:bg-grammy-500 hover:border-grammy-500 hover:text-white transition ease-in-out duration-250 inline-block text-sm rounded-md opacity-90`}
                    href={example.stackblitz}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open project
                  </a>
                </p>
              </div>
            )}

            {example.additionalResources.length > 0 && (
              <div class={tw`col-span-3 mt-12 pt-6 border-t-1 border-gray-200`}>
                <p class={tw`text-gray-500`}>
                  Additional resources:
                </p>
                <ul class={tw`list-disc list-inside mt-1`}>
                  {example.additionalResources.map(([link, title]) => (
                    <li
                      class={tw`text-gray-700`}
                      key={link + title}
                    >
                      <a
                        class={tw`hover:underline hover:text-grammy-500 focus:underline`}
                        href={link}
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div class={tw`col-span-2 mt-12 flex justify-between h-14`}>
          {prev
            ? (
              <a
                href={`/${prev.id}`}
                class={tw`w-6/12 text-gray-600 flex items-center gap-3 lg:gap-2 :hover:text-gray-900`}
              >
                <CircleArrow />
                {prev.title}
              </a>
            )
            : <div class={tw`w-6/12`} />}
          {next && (
            <a
              href={`/${next.id}`}
              class={tw`w-6/12 text-gray-600 text-right flex items-center justify-end gap-3 lg:gap-2 :hover:text-gray-900`}
            >
              {next.title}
              <CircleArrow right />
            </a>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function SnippetComponent(props: {
  filename: string;
  firstOfFile: boolean;
  lastOfFile: boolean;
  snippet: ExampleSnippet;
}) {
  // TODO: replacing for all modules.
  props.snippet.code = props.snippet.code.replace(
    /https:\/\/deno\.land\/x\/grammy(@\d.\d.\d|)\/(.+)/g,
    `https://deno.land/x/grammy@${VERSIONS.grammy}/$2`,
  );

  const renderedSnippet = Prism.highlight(
    props.snippet.code,
    Prism.languages.ts,
    "ts",
  );

  return (
    <div
      class={tw`grid grid-cols-1 sm:grid-cols-5 gap-x-6 transition duration-150 ease-in`}
    >
      <div class={tw`py-4 text-gray-700 col-span-2 select-none`}>
        {props.snippet.text}
      </div>
      <div
        class={tw`col-span-3 relative bg-gray-100 ${
          props.firstOfFile ? "rounded-t-md" : ""
        } ${props.lastOfFile ? "rounded-b-md" : ""} ${
          props.snippet.code.length === 0 ? "hidden sm:block" : ""
        }`}
      >
        {props.filename && (
          <span
            class={tw`font-mono text-xs absolute -top-3 left-4 bg-gray-200 z-10 p-1 rounded-sm ${
              props.firstOfFile ? "block" : "block sm:hidden"
            }`}
          >
            {props.filename}
          </span>
        )}

        <div
          class={tw`px-4 py-4 text-sm overflow-auto relative gfm-highlight`}
        >
          <pre dangerouslySetInnerHTML={{ __html: renderedSnippet }} />
        </div>
      </div>
    </div>
  );
}
