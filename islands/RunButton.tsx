/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import {Start,Stop,Loading} from '../components/Icons.tsx'

export default function RunButton({ id }: { id: string }) {
  const [disabled, setDisabled] = useState(true);
  const [running, setRunning] = useState(false);
  const [busy, setBusy] = useState(false);
  const token = () => localStorage.getItem("token");
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
      const url = new URL(`/static/${id}.ts`, location.href);
      const { getBot } = await import(
        `https://bundle.deno.dev/${url.toString()}`
      );
      const bot = getBot(token());
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
    if (token()) {
      setDisabled(false);
    }
  }, []);

  return (
    <button
      disabled={disabled || busy}
      onClick={run} >
      {running ? <Stop /> : busy ? <Loading /> : <Start />}
    </button>
  );
}
