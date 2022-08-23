/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function RunButton({ id }: { id: string }) {
  const [disabled, setDisabled] = useState(true);
  const botToken = () =>
    Object.fromEntries(
      document.cookie.split(";").map((v) => v).map((v) => v.split("=")),
    ).bot_token;
  // deno-lint-ignore no-explicit-any
  let bot: any;
  let busy = false;
  let running = false;

  async function run() {
    if (busy) {
      return;
    }
    busy = true;
    if (running) {
      const url = new URL(`/static/${id}.ts`, location.href);
      const { getBot } = await import(
        `https://bundle.deno.dev/${url.toString()}`
      );
      const bot = getBot(botToken());
      bot.start({
        drop_pending_updates: true,
        onStart: () => {
          busy = false;
          running = true;
        },
      });
    } else {
      bot.stop();
      busy = false;
    }
  }

  useEffect(() => {
    if (botToken()) {
      setDisabled(false);
    }
  }, []);

  return <button disabled={disabled} onClick={run}>Run</button>;
}
