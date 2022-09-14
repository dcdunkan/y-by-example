/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { useEffect, useState } from "preact/hooks";
import { Loading, Start, Stop } from "../components/Icons.tsx";
import { Example } from "../utils/example.ts";
import confetti from "confetti";

export default function ExampleHeader({ example }: { example: Example }) {
  const [running, setRunning] = useState(false);
  const [busy, setBusy] = useState(false);
  // deno-lint-ignore no-explicit-any
  const [bot, setBot] = useState<any>(undefined);
  const [desc, setDesc] = useState(example.description);
  const [reason, setReason] = useState("Sorry, you cannot run this example.");

  async function run() {
    if (!bot) {
      setDesc(reason);
      setTimeout(() => setDesc(example.description), 4000);
      return;
    }
    if (busy) {
      setDesc("Loading...");
      return;
    }
    setBusy(true);
    if (running) {
      setRunning(false);
      setDesc("Stopping the bot...");
      await bot.stop();
      setBusy(false);
      setDesc(example.description);
    } else {
      bot.start({
        drop_pending_updates: true,
        onStart: async ({ username }: { username: string }) => {
          setBusy(false);
          setRunning(true);

          const liveStatus =
            `Example is active at <a class="text-grammy-500 hover:underline" href="https://telegram.me/${username}">@${username}</a>.`;
          const showConfetti = localStorage.getItem("showConfetti");
          if (showConfetti !== "false") {
            setDesc("Yay! Welcome to grammY!");
            setTimeout(() => setDesc(liveStatus), 4000);
            localStorage.setItem("showConfetti", "false");
            await confetti({
              particleCount: 1000,
              ticks: 500,
              spread: 120,
              startVelocity: 120,
              disableForReducedMotion: true,
              origin: { y: 1.4 },
            });
          } else {
            setDesc(liveStatus);
          }
        },
      }).catch(() => {
        setBusy(false);
        setRunning(false);
        setDesc(
          `<span style="color: #ef4444">Error occurred while running :(</span>`,
        );
      });
    }
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setBusy(true);
        const url = new URL(`/bundled/${example.id}.js`, location.href);
        const { getBot } = await import(url.toString());
        const bot = getBot(token);
        await bot.init();
        setBusy(false);
        setBot(bot);
        setDesc(example.description);
      } else {
        setReason(
          `<a href="/#token" class="hover:text-grammy-500 hover:underline">No bot token, no bot ¯_(ツ)_/¯</a>`,
        );
      }
    })();
  }, []);

  return (
    <div>
      <div class={tw`flex items-center gap-2.5`}>
        <h1 class={tw`mt-2 text-3xl font-bold`}>
          {example.title}
        </h1>
        {example.run && (
          <button
            class={tw`focus:outline-none ${
              busy ? "" : `transform transition duration-300 hover:scale-110`
            }`}
            onClick={run}
            disabled={busy}
          >
            {running ? <Stop /> : busy ? <Loading /> : <Start />}
          </button>
        )}
      </div>
      {desc && (
        <div class={tw`mt-1`}>
          <p
            class={tw`text-gray-500`}
            dangerouslySetInnerHTML={{ __html: desc }}
          >
          </p>
        </div>
      )}
    </div>
  );
}
