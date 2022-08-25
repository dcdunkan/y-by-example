/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "twind";
import { Loading } from "../components/Icons.tsx";

export default function BotTokenInput() {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("Bot token");
  const [inputToken, setInputToken] = useState("");

  async function getMe(token: string) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
      console.log(res.status);
      if (res.status == 200) {
        const { result } = await res.json();
        console.log(result);
        return result.username;
      }
    } catch (_err) {
      //
    }
    return "";
  }

  useEffect(() => {
    (async () => {
      setBusy(true);
      const token = localStorage.getItem("token");
      if (token) {
        setToken(token);
        setInputToken(token);
        const username = await getMe(token);
        if (username) {
          setText(`Authorized as @${username}.`);
        } else {
          setText("Invalid token");
        }
      }
      setBusy(false);
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  function set() {
    (async () => {
      setBusy(true);
      if (inputToken) {
        const username = await getMe(inputToken);
        if (username) {
          setToken(inputToken);
          setText(`Authorized as @${username}`);
        } else {
          setText("Invalid token");
        }
      }
      setBusy(false);
    })();
  }

  return (
    <div class={tw`flex flex-col mt-8 gap-4`}>
      <label
        htmlFor="bot_token"
        class={tw`block font-medium h-4 ${
          text.startsWith("Invalid") ? tw`text-red-500` : ''
        }`}
      >
        {busy ? <Loading /> : text}
      </label>
      <div class={tw`flex gap-2.5`}>
        <input
          type="password"
          id="bot_token"
          name="bot_token"
          class={tw`bg-gray-50 dark:bg-gray-800 border focus:outline-none dark:text-gray-100 border-gray-300 dark:border-gray-700 rounded-lg focus:ring-grammy-500 focus:border-grammy-500 w-full p-2.5`}
          placeholder="123456:ABCdef"
          value={inputToken}
          autoComplete="off"
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
