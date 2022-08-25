/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "twind";

export default function BotTokenInput() {
  const [token, setToken] = useState("");
  const [text, setText] = useState("Bot token");
  const [inputToken, setInputToken] = useState("");
  async function getBot(token: string) {
    const { getBot } = await import(
      `https://bundle.deno.dev/${new URL(
        "/static/hello-world.ts",
        location.href,
      )}`
    );
    return getBot(token);
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const bot = await getBot(token);
        try {
          await bot.init();
          setInputToken(token);
          setText(`Authorized as @${bot.me.username}`);
        } catch (_err) {
          localStorage.removeItem("token");
        }
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  function set() {
    (async () => {
      if (!inputToken) {
        return;
      }
      const bot = await getBot(inputToken);
      try {
        await bot.init();
        setToken(inputToken);
        setText(`Authorized as @${bot.me.username}`);
      } catch (_err) {
        //
      }
    })();
  }

  return (
    <div class={tw`flex flex-col mt-8 gap-2.5`}>
      <label
        htmlFor="bot_token"
        class={tw`block font-medium text-gray-900`}
      >
        {text}
      </label>
      <div class={tw`flex gap-2.5`}>
        <input
          type="password"
          id="bot_token"
          name="bot_token"
          class={tw`bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-grammy-500 focus:border-grammy-500 w-full p-2.5`}
          placeholder="123456:ABCdef"
          value={inputToken}
          onChange={(e) => setInputToken(e.currentTarget.value)}
        />
        <button
          class={tw`bg-grammy-500 px-5 py-2 text-white rounded-lg hover:bg-grammy-400`}
          onClick={set}
        >
          Set
        </button>
      </div>
    </div>
  );
}
