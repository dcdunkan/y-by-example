/** @jsx h */
/** @jsxFrag Fragment */
import {
  Fragment,
  getCookies,
  h,
  Handlers,
  Head,
  PageProps,
  Prism,
  tw,
} from "../deps.ts";
import { CircleArrow, DeployLogo } from "../components/Logos.tsx";
import { Example, ExampleSnippet, parseExample } from "../utils/example.ts";
import { TOC, version } from "../utils/toc.ts";

interface Data {
  token: string;
  example: Example;
  prev: Example | null;
  next: Example | null;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const token = getCookies(req.headers)["bot_token"] ?? "";

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
      const cur = TOC.indexOf(id);
      const prevId = TOC[cur - 1];
      const nextId = TOC[cur + 1];
      const [data, prevData, nextData] = await Promise.all(
        [id, prevId, nextId].map((name) =>
          name ? Deno.readTextFile(`./data/${name}.ts`) : Promise.resolve("")
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

      let code = `let __BOT_TOKEN = prompt("Enter your Bot Token:");
if (!__BOT_TOKEN) throw new Error("Invalid bot token.");\n\n`;

      for (const snippet of file.snippets) {
        code += snippet.code + "\n";
      }

      code = code.replace(/"<REPLACE_BOT_TOKEN>"/g, "__BOT_TOKEN");
      code = code.replace(
        /https:\/\/deno\.land\/x\/grammy(|@v\d+.\d+.\d+)\/(.+)/g,
        `https://deno.land/x/grammy@${version}/$2`,
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
    return ctx.render({ example, prev, next, token });
  },
};

export default function ExamplePage(props: PageProps<Data>) {
  const { example, prev, next, token } = props.data;

  if (!example) {
    return <div>404 Example Not Found</div>;
  }

  const url = `${props.url.origin}${props.url.pathname}.ts`;

  const description = (example.description || example.title) +
    " -- grammY by example is a collection of annotated examples for how to use grammY, and the various features it provides.";

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/gfm.css" />
        <meta name="description" content={description} />
      </Head>
      <main class={tw`max-w-screen-lg mx-auto p-4`}>
        <h1 class={tw`mt-2 text-3xl font-bold`}>{example.title}</h1>
        {example.description && (
          <div class={tw`mt-1`}>
            <p class={tw`text-gray-500`}>
              {example.description}
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
                token={token}
              />
            ))}
          </div>
        ))}
        <div class={tw`grid grid-cols-1 sm:grid-cols-5 gap-x-6`}>
          <div class={tw`col-span-2 mt-8`} />
          <div class={tw`col-span-3 mt-8`}>
            {example.run && (
              <>
                <p class={tw`text-gray-700`}>
                  Run{" "}
                  <a href={url} class={tw`hover:underline focus:underline`}>
                    this example
                  </a>{" "}
                  locally using the Deno CLI:
                </p>
                <pre
                  class={tw`mt-2 bg-gray-100 p-4 overflow-x-auto text-sm select-all rounded-md`}
                >
                  deno run --allow-net {example.run.replace("<url>", url)}
                </pre>
              </>
            )}
            {example.playground && (
              <div class={tw`col-span-3 mt-8`}>
                <p class={tw`text-gray-700`}>
                  Try this example in a Deno Deploy playground:
                </p>
                <p class={tw`mt-3`}>
                  <a
                    class={tw`py-2 px-4 bg-black inline-block text-white text-base rounded-md opacity-90 hover:opacity-100`}
                    href={example.playground}
                    target="_blank"
                    rel="noreferrer"
                    title="Deploy"
                  >
                    <DeployLogo />
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
                      class={tw`text-gray-700 hover:text-gray-900`}
                      key={link + title}
                    >
                      <a
                        class={tw`hover:underline focus:underline`}
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
    </>
  );
}

function SnippetComponent(props: {
  filename: string;
  firstOfFile: boolean;
  lastOfFile: boolean;
  snippet: ExampleSnippet;
  token: string;
}) {
  props.snippet.code = props.snippet.code.replace(
    /<REPLACE_BOT_TOKEN>/g,
    props.token || "BOT_TOKEN",
  );

  props.snippet.code = props.snippet.code.replace(
    /https:\/\/deno\.land\/x\/grammy(@\d.\d.\d|)\/(.+)/g,
    `https://deno.land/x/grammy@${version}/$2`,
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
      <div class={tw`py-4 text-gray-700 col-span-2`}>
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
          class={tw`px-4 py-4 text-sm overflow-scroll sm:overflow-hidden relative gfm-highlight`}
        >
          <pre dangerouslySetInnerHTML={{ __html: renderedSnippet }} />
        </div>
      </div>
    </div>
  );
}
