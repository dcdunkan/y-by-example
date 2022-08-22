export interface ExampleSnippet {
  text: string;
  code: string;
}

export interface ExampleFile {
  name: string;
  snippets: ExampleSnippet[];
}

export interface Example {
  id: string;
  title: string;
  description: string;
  additionalResources: [string, string][];
  run?: string;
  playground?: string;
  files: ExampleFile[];
  introduction: string;
  conclusion: string;
}

export function parseExample(id: string, file: string): Example {
  // Extract the multi line JS doc comment at the top of the file
  const [, jsdoc, rest] = file.match(/^\s*\/\*\*(.*?)\*\/\s*(.*)/s) || [];

  // Extract the @key value pairs from the JS doc comment
  let description = "";
  const kvs: Record<string, string> = {};
  const resources = [];

  for (let line of jsdoc.split("\n")) {
    line = line.trim().replace(/^\*/, "").trim();
    const [, key, value] = line.match(/^\s*@(\w+)\s+(.*)/) || [];
    if (key) {
      if (key === "resource") {
        resources.push(value);
      } else {
        kvs[key] = value.trim();
      }
    } else {
      description += " " + line;
    }
  }

  description = description.trim();

  // Seperate the code into snippets.
  const files: ExampleFile[] = [{
    name: "",
    snippets: [],
  }];
  let parseMode = "code";
  let currentFile = files[0];
  let text = "";
  let code = "";

  for (const line of rest.split("\n")) {
    const trimmedLine = line.trim();
    if (parseMode == "code") {
      if (line.startsWith("// File:")) {
        if (text || code.trimEnd()) {
          code = code.trimEnd();
          currentFile.snippets.push({ text, code });
          text = "";
          code = "";
        }
        const name = line.slice(8).trim();
        if (currentFile.snippets.length == 0) {
          currentFile.name = name;
        } else {
          currentFile = {
            name,
            snippets: [],
          };
          files.push(currentFile);
        }
      } else if (line.startsWith("/* File:")) {
        if (text || code.trimEnd()) {
          code = code.trimEnd();
          currentFile.snippets.push({ text, code });
          text = "";
          code = "";
        }
        const name = line.slice(8).trim();
        if (currentFile.snippets.length == 0) {
          currentFile.name = name;
        } else {
          currentFile = {
            name,
            snippets: [],
          };
          files.push(currentFile);
        }
        parseMode = "file";
      } else if (
        trimmedLine.startsWith("// deno-lint-ignore") ||
        trimmedLine.startsWith("//deno-lint-ignore")
      ) {
        // skip lint directives
      } else if (trimmedLine.startsWith("//-")) {
        code += line.replace("//-", "//") + "\n";
      } else if (trimmedLine.startsWith("//")) {
        if (text || code.trimEnd()) {
          code = code.trimEnd();
          currentFile.snippets.push({ text, code });
        }
        text = trimmedLine.slice(2).trim();
        code = "";
        parseMode = "comment";
      } else {
        code += line + "\n";
      }
    } else if (parseMode == "comment") {
      if (
        trimmedLine.startsWith("// deno-lint-ignore") ||
        trimmedLine.startsWith("//deno-lint-ignore")
      ) {
        // skip lint directives
      } else if (trimmedLine.startsWith("//")) {
        text += " " + trimmedLine.slice(2).trim();
      } else {
        code += line + "\n";
        parseMode = "code";
      }
    } else if (parseMode == "file") {
      if (line == "*/") {
        parseMode = "code";
      } else {
        code += line + "\n";
      }
    }
  }

  if (text || code.trimEnd()) {
    code = code.trimEnd();
    currentFile.snippets.push({ text, code });
  }

  if (!kvs.title) {
    throw new Error("Missing title in JS doc comment.");
  }

  const additionalResources: [string, string][] = [];
  for (const resource of resources) {
    // @resource {https://deno.land/std/http/server.ts} std/http/server.ts
    const [_, url, title] = resource.match(/^\{(.*?)\}\s(.*)/) || [];
    if (!url || !title) {
      throw new Error(`Invalid resource: ${resource}`);
    }
    additionalResources.push([url, title]);
  }

  const firstSnippet = currentFile.snippets.shift()!;
  const introduction = firstSnippet.code === "" && firstSnippet.text !== ""
    ? firstSnippet.text
    : "";

  const lastSnippet = currentFile.snippets[currentFile.snippets.length - 1];
  const conclusion = lastSnippet.code === "" && lastSnippet.text !== ""
    ? lastSnippet.text
    : "";

  if (conclusion) {
    files[0].snippets.pop();
  }

  return {
    id,
    title: kvs.title,
    description,
    additionalResources,
    run: kvs.run,
    playground: kvs.playground,
    files,
    introduction,
    conclusion,
  };
}
