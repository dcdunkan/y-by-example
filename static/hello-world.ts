// This file is generated. Do not edit.
/**
 * @title Hello World
 * @run
 * @deno_cli <url>
 * @resource {https://grammy.dev/guide/getting-started.html} Docs: Getting Started
 *
 * Make your bot say Hello, World!
 */

// Every documentations and tutorials usually starts with a "Hello, World" program.
// You can make your bot say "Hello, World" to the user with very few lines of code using grammY.

// First, let's import the main `Bot` class from grammY.
import { Bot } from "https://deno.land/x/grammy@v1.10.1/mod.ts";
//- import { Bot } from "grammy"; // Node.js

// Now create an instance of the bot using your Bot Token.
const bot = new Bot("<REPLACE_BOT_TOKEN>");

// We need the bot to reply "Hello, World!" to any incoming message.
// To achieve this, we have to register a message handler to the bot.
// You can listen for any type of messages using the "message" filter query.
bot.on("message", (ctx) => ctx.reply("Hello, World!"));

// The method `reply` is used for replying to that incoming message.

// Finally, to make this cool Hello World bot online, lets start it.
// bot.start();

// Thats it! You have created a "Hello, World" bot in just 4 lines of code!
// Now try sending messages to your bot.
// You can change the "Hello, World" to anything that you like the bot to say.

export { bot };
