/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "twind";
import { Loading } from "../components/Icons.tsx";

const VALID_TOKEN = /^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/g;

export default function BotTokenInput() {
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("Bot token");
  const [inputToken, setInputToken] = useState("");

  async function getMe(token: string) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getMe`);
      if (res.status == 200) {
        const { result } = await res.json();
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

  function set(input: string) {
    (async () => {
      setBusy(true);
      setInputToken(input);
      if (!input) {
        // Allow users to clear token by clearing the input.
        setText("Bot token");
        setToken("");
      } else if (!VALID_TOKEN.test(input)) {
        setText("Invalid token");
      } else {
        const username = await getMe(input);
        if (username) {
          setToken(input);
          setText(`Authorized as @${username}.`);
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
          text.startsWith("Invalid") ? tw`text-red-500` : tw`text-gray-900`
        }`}
      >
        {busy ? <Loading /> : text}
      </label>
      <input
        type="password"
        id="bot_token"
        name="bot_token"
        class={tw`bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-grammy-500 focus:border-grammy-500 w-full p-2.5`}
        placeholder="123456:ABCdef"
        value={inputToken}
        autoComplete="off"
        onInput={(e) => set(e.currentTarget.value)}
      />
    </div>
  );
}
