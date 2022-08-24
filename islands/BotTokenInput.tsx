/** @jsx h  */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "twind";

export default function BotTokenInput() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token") ?? "");
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <input
      type="text"
      id="bot_token"
      name="bot_token"
      class={tw`bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-grammy-500 focus:border-grammy-500 w-full p-2.5`}
      placeholder="123456:ABCdef"
      value={token}
      onChange={(e) => setToken(e.currentTarget.value)}
    />
  );
}
