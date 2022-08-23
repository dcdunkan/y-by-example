> Work in progress.

<!--
![light-mode](https://user-images.githubusercontent.com/70066170/186004902-d48700c9-52c7-45a6-b966-3a9a0b49c263.png)
![dark-mode](https://user-images.githubusercontent.com/70066170/186004908-e322db60-9dd7-4420-a241-d7e2c35883b7.png)
-->

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" width="300" alt="grammY by example" srcset="https://user-images.githubusercontent.com/70066170/186004908-e322db60-9dd7-4420-a241-d7e2c35883b7.png">
    <img alt="grammY by example" width="300" src="https://user-images.githubusercontent.com/70066170/186004902-d48700c9-52c7-45a6-b966-3a9a0b49c263.png">
  </picture>
</div>
<br>

This repository contains the source code for
[grammY by example](https://yex.deno.dev) based on
[Deno by Example](https://examples.deno.land).

grammY by example is a collection of annotated examples to help beginners to get
started on using grammY, and the various features and plugins that comes with
it.

- Each example should be a single file
- Examples are written in TypeScript
- Examples are primarily written for [Deno](https://deno.land) runtime (with
  changes in imports they can also run on Node.js)
- Each example should be a self-contained unit, and should depend on no
  dependencies other than core library, official plugins, and runtime libraries
  (exceptions can be made)
- Each example should be runnable without additional dependencies on all systems
- Code should be kept really simple, and should be easy to read and understand
  by anyone. Do not use complicated code constructs, or hard to follow builtins
- Concepts introduced in an example should be explained using simple words

## Contributing

### Adding an example

To add an example, create a file in the [contents/](./contents/) directory. The
file name should be the id of the example, and the contents should be the code
for the example. The file should be in the `.ts` format. The file should start
with a JSDoc style multi line comment that describes the example:

```ts
/**
 * @title Hello World
 * @deno_cli --allow-net <url>
 *
 * Make your bot say "Hello World" to users.
 */
```

See all supported tags and their explanation [here](#supported-tags).

After the pragmas, you should add a description of the example. It should not be
longer than one or two lines. The description shows up at the top of the example
in the example page, home page, and in search results.

After the JSDoc comment, you can write the code. Code can be prefixed with a
comment that describes the code. The comment will be rendered next to the code
in the example page.

Optionally, if the first comment is not suffixed with a code snippet, it will be
considered as an introduction of the example, and rendered in full width (not
next to a code block). It can be a little descriptive introduction that extends
the actual description of the example. Similarly, if the final comment is not
suffixed with a code snippet, it'll be considered as conclusion section of the
example and will be rendered like the introduction.

Now add your example to the [table of contents](./utils/contents.ts) file. This
will cause it to show up on the index page. It should be added to an appropriate
position based on how advanced the example is. The simpler the example is, the
higher the position it gets.

After you have added the example, run `deno fmt` and `deno lint` to format and
lint the example.

#### Supported tags

- `title`: Title of the example. Must be super short but clear. This is the only
  required tag.
- `run`: If this tag is given the example is considered as runnable on browser
  and buttons for running the example will be shown.
- `resource`: Additional resources that readers can refer to. An example can
  have more than one `@resource` tags.
- `deno_cli`: This tag must be provided if the example can be run with
  [Deno CLI](https://deno.land). Required permissions must be provided as well.
- `deno_pg`: Link to Deno Deploy playground, if any. Recommended to provide, so
  that the Deno users can play with it.
- `stackblitz`: Link to a stackblitz project. Recommended to provide, so that
  the Node.js users can play with it.

Example usage of the tags:

```ts
/**
 * @title Example Title
 * @run
 * @resource {https://grammy.dev/guide/} Docs: Getting Started
 * @resource {https://core.telegram.org/bots/api/} Bot API Docs: Example
 * @deno_cli --allow-net <url>
 * @deno_pg https://dash.deno.com/playground/grammy-example
 * @stackblitz https://node.new
 *
 * Short and simple description of the example.
 */
```

### Running the webserver locally

To run the webserver locally, open a terminal and run:

```shell
deno task dev
```

You can then view the page at http://localhost:8000/

Before opening a PR with a change, make sure `deno fmt` and `deno lint` pass in
the latest Deno release.
