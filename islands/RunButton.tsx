/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function RunButton({ id }: { id: string }) {
  const [disabled, setDisabled] = useState(true);
  const botToken = () =>
    Object.fromEntries(
      document.cookie.split(";").map((v) => v).map((v) => v.split("=")),
    ).bot_token;
  let ip = false;

  async function run() {
    if (ip) {
      return false;
    }
    ip = true;
    const url = new URL(`/static/${id}.ts`, location.href);
    const { bot } = await import(`https://bundle.deno.dev/${url.toString()}`);
    bot.token = botToken();
    bot.start({ onStart: () => console.log(1) });
    ip = false;
  }

  useEffect(() => {
    if (botToken()) {
      setDisabled(false);
    }
  }, []);

  return <button disabled={disabled} onClick={run}>Run</button>;
}
