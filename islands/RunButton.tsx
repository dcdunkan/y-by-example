/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function RunButton({ id }: { id: string }) {
  const [disabled, setDisabled] = useState(true);
  const botToken = () =>
    Object.fromEntries(
      document.cookie.split(";").map((v) => v).map((v) => v.split("=")),
    ).bot_token;

  async function run() {
    const url = new URL(`/${id}.ts`, location.href);
    const { bot } = await import(`https://bundle.deno.dev/${url.toString()}`);
    console.log(bot);
  }

  useEffect(() => {
    if (botToken()) {
      setDisabled(false);
    }
  }, []);

  return <button disabled={disabled} onClick={run}>Run</button>;
}
