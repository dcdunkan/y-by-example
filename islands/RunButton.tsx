/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Loading, Start, Stop } from "../components/Icons.tsx";

export default function RunButton({ id }: { id: string }) {
  const [enabled, setEnabled] = useState(false);
  const [running, setRunning] = useState(false);
  const [busy, setBusy] = useState(false);
  const [bot, setBot] = useState<any>(undefined);

  async function run() {
    if (!bot) {
      return;
    }
    if (busy) {
      return;
    }
    setBusy(true);
    if (running) {
      bot.stop();
      setRunning(false);
      setBusy(false);
    } else {
      bot.start({
        drop_pending_updates: true,
        onStart: () => {
          setBusy(false);
          setRunning(true);
        },
      }).catch(() => {
        setBusy(false);
        setRunning(true);
      });
    }
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const url = new URL(
          `/static/${id}.ts`,
          "https://yex-svk7enm6fy5g.deno.dev",
        );
        const { getBot } = await import(
          `https://bundle.deno.dev/${url.toString()}`
        );
        const bot = getBot(token);
        await bot.init();
        setBot(bot);
        setEnabled(true);
      }
    })();
  }, []);

  return (
    <button
      onClick={run}
    >
      {enabled ? running ? <Stop /> : busy ? <Loading /> : <Start /> : ""}
    </button>
  );
}
