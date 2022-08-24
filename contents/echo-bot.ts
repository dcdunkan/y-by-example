/**
 * @title Echo Bot
 * @run
 * @deno_cli <url>
 *
 * Echo the user.
 */

// In this example, we'll see how to create an echo bot, which echoes anything that the user sends to the bot.

// Import the `Bot` class and create an instance.
import { Bot } from "https://deno.land/x/grammy@v1.10.1/mod.ts";
const bot = new Bot("<REPLACE_BOT_TOKEN>");

// The easiest way to create this bot is to just copy the incoming message to the same chat.
// You can use the `copyMessage` method to achieve that.
// Lets do that only for text messages now.

//- "msg:text" or "message:text"; both are the same!
//- Don't forget to checkout the example about filter queries.
bot.on("msg:text", (ctx) => ctx.copyMessage(ctx.chat.id));

// The context property `chat` contains information about the chat that message came from.
// It could be a private or group chat.
// In this case, we're only accessing ID of the chat.
// You can also check for the chat type, then access the title, name, username (if any) etc.

// Now that we have taken care of text messages by copying them, let's look at what we can do about the other message types.
// Maybe we can just forward them to the same chat.
// It is basically copying anyway.

//- When copying a message, it shows as the message is written
//- by the bot. But forwarding the message, shows the "Forwarded
//- from User" header above messages.
bot.on("msg", (ctx) => ctx.forwardMessage(ctx.chat.id));

// Start the bot.
bot.start();

// That was easier than you thought, right? Just 5 lines of code ⚡
