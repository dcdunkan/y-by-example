// ==== LATEST VERSIONS

export const VERSIONS = {
  grammy: await x("grammy"),
};

async function x(module: string) {
  const res = await fetch(`https://cdn.deno.land/${module}/meta/versions.json`);
  return res.ok ? `@${(await res.json()).latest}` as string : "";
}
