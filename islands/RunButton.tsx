/** @jsx h */
/** @jsxFrag Fragment */
import { h ,Fragment} from "preact";
import { useEffect, useState } from "preact/hooks";
import { Loading, Start, Stop } from "../components/Icons.tsx";

export default function RunButton({ id }: { id: string }) {
  const [enabled, setEnabled] = useState(false);
  const [running, setRunning] = useState(false);
  const [busy, setBusy] = useState(false);
  // deno-lint-ignore no-explicit-any
  let bot: any;

  async function run() {
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
      });
    }
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const url = new URL(`/static/${id}.ts`, location.href);
        const { getBot } = await import(
          `https://bundle.deno.dev/${url.toString()}`
        );
        bot = getBot(token)
        await bot.init()
        setEnabled(true)
      }
    })();
  }, []);

  return (
    enabled ? <button
      onClick={run}
    >
      {running ? <Stop /> : busy ? <Loading /> : <Start />}
    </button> : <></> 
  );
}
