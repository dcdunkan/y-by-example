/**
 * @title Filter Queries
 * @run
 * @deno_cli <url>
 * @resource {https://grammy.dev/guide/filter-queries.html} Docs: Filter Queries and bot.on()
 *
 * Filtering the incoming updates.
 */

// grammY's update filtering makes writing bots much easier.
// You don't need hundreds of `if-else` in your code.
// You don't need to check for messages that has URLs, mentions, etc using ifs.
// In this example, you'll learn how to filter updates in the proper way!
// NOTE: If you're using TypeScript, you can get a complete list of filter queries right in your editor.

// Import the `Bot` class and create a bot using your bot token.
import { Bot } from "https://deno.land/x/grammy@v1.10.1/mod.ts";
const bot = new Bot("BOT_TOKEN");

// Start the bot.
bot.start();
