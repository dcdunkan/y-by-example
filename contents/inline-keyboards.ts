/**
 * @title Inline Keyboards
 * @run
 * @deno_cli <url>
 * @resource {https://grammy.dev/plugins/keyboard.html#inline-keyboards} Docs: Inline Keyboards
 *
 * Attach buttons to messages.
 */

// Inline keyboards are sets of buttons that are displayed underneath messages.
// grammY has a simple and intuitive way to build up the inline keyboards that your bot can send along with a message.

// Lets setup the bot as we seen in the Hello World example.
import { Bot, InlineKeyboard } from "https://deno.land/x/grammy@v1.11.0/mod.ts";
const bot = new Bot("BOT_TOKEN");

// Construct a keyboard.
const inlineKeyboard = new InlineKeyboard().text("click", "click-payload");

// Send a keyboard along with a message.
bot.command("start", async (ctx) => {
  await ctx.reply("Curious? Click me!", { reply_markup: inlineKeyboard });
});

// Wait for click events with specific callback data.
bot.callbackQuery("click-payload", async (ctx) => {
  await ctx.answerCallbackQuery("You were curious, indeed!");
});
