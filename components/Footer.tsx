/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

const FOOTER_LINKS = [
  ["https://telegram.me/grammyjs_news", "News"],
  ["https://telegram.me/grammyjs", "Community"],
  ["https://github.com/grammyjs/grammY", "GitHub"],
  ["https://grammy.dev", "Documentation"],
  ["https://doc.deno.land/https://deno.land/x/grammy/mod.ts", "API Reference"],
];

export function Footer() {
  return (
    <footer class={tw`flex justify-between items-end p-8`}>
      <div class={tw`flex align-center`}>
        <p class={tw`select-none text-grammy-500 ml-4 font-bold text-xl`}>
          <a href="https://grammy.dev">grammY</a>
        </p>
      </div>
      <div class={tw`flex flex-col lg:flex-row gap-x-8 gap-y-6 text-right`}>
        {FOOTER_LINKS.map(([href, text]) => (
          <a href={href} class={tw`text-gray-500 hover:text-grammy-500`}>
            {text}
          </a>
        ))}
      </div>
    </footer>
  );
}
