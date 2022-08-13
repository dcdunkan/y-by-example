/**
 * @title Hello World
 * @run <url>
 * @resource {https://grammy.dev/guide/getting-started.html} Docs: Getting Started
 *
 * Every documentations and tutorials usually starts with a "Hello, World" program.
 * You can make your bot say "Hello, World" to the user with very few lines of code using grammY.
 * Here is how to build one!
 */

// First, let's import the main `Bot` class from grammY.
import { Bot } from "https://deno.land/x/grammy@v1.10.1/mod.ts";

// Now create an instance of the bot using your `BOT_TOKEN`.
// If you have provided a Bot Token in the home page, you can run these example by clicking the RUN button!
const bot = new Bot("<REPLACE_BOT_TOKEN>");
// grammY bots can either be written in JavaScript or TypeScript, or a mixture
// of both. All code in these examples is written in TypeScript, but all the
// examples also work in JavaScript.
