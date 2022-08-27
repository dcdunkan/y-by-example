/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { useEffect, useState } from "preact/hooks";
import { Info, Loading, Start, Stop } from "../components/Icons.tsx";

export default function RunButton({ id }: { id: string }) {
  const [enabled, setEnabled] = useState(false);
  const [running, setRunning] = useState(false);
  const [busy, setBusy] = useState(false);
  // deno-lint-ignore no-explicit-any
  const [bot, setBot] = useState<any>(undefined);
  const [title, setTitle] = useState("");

  async function run() {
    if (!bot) {
      setTitle("You can't run this example");
      return;
    }
    if (busy) {
      setTitle("Loading...");
      return;
    }
    setBusy(true);
    if (running) {
      await bot.stop();
      setRunning(false);
      setBusy(false);
      setTitle("Click to run the example");
    } else {
      bot.start({
        drop_pending_updates: true,
        onStart: ({ username }: { username: string }) => {
          setBusy(false);
          setRunning(true);
          setTitle(`Live at @${username}. Click to stop.`);
        },
      }).catch(() => {
        setBusy(false);
        setRunning(true);
        setTitle("Error occurred while running");
      });
    }
  }

  useEffect(() => {
    (async () => {
      setTitle("Loading...");
      const token = localStorage.getItem("token");
      if (token) {
        const url = new URL(`/static/${id}.ts`, location.href);
        const { getBot } = await import(
          `https://bundle.deno.dev/${url.toString()}`
        );
        const bot = getBot(token);
        await bot.init();
        setBot(bot);
        setEnabled(true);
        setTitle("Click to run the example");
      } else {
        setTitle("No bot token set");
      }
    })();
  }, []);

  return (
    <button
      class={tw`focus:outline-none`}
      onClick={run}
      title={title}
    >
      {enabled ? running ? <Stop /> : busy ? <Loading /> : <Start /> : <Info />}
    </button>
  );
}
