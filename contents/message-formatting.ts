/**
 * @title Message Formatting
 * @run
 * @deno_cli <url>
 * @resource {https://grammy.dev/guide/basics.html#sending-message-with-formatting} Docs: Sending Message With Formatting
 * @resource {https://core.telegram.org/bots/api#formatting-options} Bot API Manual: Formatting Options
 *
 * Format bot's text messages using parse modes.
 */
// Telegram allows you to format your messages and make them look better.
// By providing 'parse_mode' option while sending messages, your bot can also do this.

// As usual, import the main `Bot` class from grammY.
import { Bot } from "https://deno.land/x/grammy@v1.11.0/mod.ts";

// Next step: create an instance of the bot using your Bot Token.
const bot = new Bot("BOT_TOKEN");

// Lets say a bold hello to the user, when they use the `/start` command.
// We're using "MarkdownV2" parse mode for it.
bot.command("start", async (ctx) => {
  await ctx.reply("*Hello there\!*", {
    parse_mode: "MarkdownV2",
  });
});

// There is also the HTML parse mode.
// Lets design a help message using the HTML mode.
bot.command("help", async (ctx) => {
  await ctx.reply(
    "<b>Help</b>\n" +
      "I can show you ID of the current chat. Just send /id!\n\n" +
      `This chat's ID is: <code>${ctx.chat.id}</code>`,
    { parse_mode: "HTML" },
  );
});

// There is also Markdown V1.
// This only exists for backward compatibility.
// You shouldn't be using this for your bot.
// But for demonstration purposes:
bot.command("id", async (ctx) => {
  await ctx.reply("`" + ctx.chat.id + "`", {
    parse_mode: "Markdown",
  });
});

// Make the bot online.
bot.start();

// Now you know how to make your bot's messages look cooler in chats.
// Check out the additional resources below for more information related to message formatting.
// grammY also has an official parse mode plugin which makes your code much cleaner and simplify the work.
// We'll look into that in a different chapter.
