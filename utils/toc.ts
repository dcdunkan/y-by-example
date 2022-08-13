export const TOC = [
  "hello-world",
];

const response = await fetch("https://cdn.deno.land/grammy/meta/versions.json");
export const version = response.ok ? (await response.json()).latest : "";
