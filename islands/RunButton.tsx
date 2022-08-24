/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw } from "twind";

export default function RunButton({ id }: { id: string }) {
  const [disabled, setDisabled] = useState(true);
  const [running, setRunning] = useState(false);
  const token = () => localStorage.getItem("token");
  // deno-lint-ignore no-explicit-any
  let bot: any;
  let busy = false;

  async function run() {
    if (busy) {
      return;
    }
    busy = true;
    if (running) {
      bot.stop();
      setRunning(false);
      busy = false;
    } else {
      const url = new URL(`/static/${id}.ts`, location.href);
      const { getBot } = await import(
        `https://bundle.deno.dev/${url.toString()}`
      );
      const bot = getBot(token());
      bot.start({
        drop_pending_updates: true,
        onStart: () => {
          busy = false;
          setRunning(true);
        },
      });
    }
  }

  useEffect(() => {
    if (token()) {
      setDisabled(false);
    }
  }, []);

  return (
    <button
      disabled={disabled || busy}
      onClick={run}
      class={tw`text-white bg-grammy-500 ml-2 hover:bg-grammy-500 focus:ring-4 focus:outline-none focus:ring-grammy-500 rounded-lg w-full sm:w-auto px-5 py-2.5 text-center`}
    >
      {running ? "Running" : busy ? "..." : "Run"}
    </button>
  );
}
