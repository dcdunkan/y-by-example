/**
 * @title Commands
 * @run
 * @deno_cli <url>
 * @resource {https://grammy.dev/guide/basics.html#receiving-messages} Docs: Receiving Messages
 *
 * Create and assign actions to commands.
 */

// Commands are the standard way to trigger your bot to do something.
// Lets find out how to make your bot obey when you send a /command.

// Lets setup the bot as we seen in the Hello World example.
import { Bot } from "https://deno.land/x/grammy@v1.10.1/mod.ts";
const bot = new Bot("<REPLACE_BOT_TOKEN>");

// There are three "standard" commands: start, help, and settings.
// Official Telegram clients even provides buttons just to send these commands.
// So, they're special, we could say.

// /start is the first command every user of your bot will use for the first time.
// Usually it greets the user and provides information about what to do next as well.
// In most of the bots, this command acts as an "Check if the bot is alive" functionality as well.
// Now, "help" and "settings" ...you know what they are for.
bot.command("start", async (ctx) => {
  await ctx.reply("Hello there! Try the /grammy command.");
});

//- If your bot is complicated, users probably need /help!
bot.command("help", (ctx) => ctx.reply("How may I help you?"));

bot.command("settings", async (ctx) => {
  await ctx.reply("Here are a few things that you can configure about me:");
  //- TODO: List settings (in a later chapter!)
});

// But commands aren't limited to just start, help and settings.
// You can have custom commands as much as you want!
// Here is a command that says random things about grammY.
// Isn't it cool? 😎
const DESCRIPTIONS = [
  "think of the whY",
  "a new era of bot development",
  "runs faster than you",
  "one update ahead",
  "can do anything except dishes",
  "easy peasy lemon squeezY",
  "hundreds of millions served",
];

bot.command("grammy", async (ctx) => {
  const random = Math.floor(Math.random() * DESCRIPTIONS.length);
  await ctx.reply(`grammY ...${DESCRIPTIONS[random]}`);
});

// Finally, make the bot online.
bot.start();

// Go create some commands and make your bot do something cool when that command is triggered.
// Here is something for you to try:
// A joke command that gives random jokes.
// If you can't figure it out by yourself, read the other examples, you'll find it in one of them!
