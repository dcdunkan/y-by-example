#!/usr/bin/env -S deno run -A --watch=static/,routes/ --no-clear-screen
import dev from "https://deno.land/x/fresh@1.0.2/dev.ts";

await dev(import.meta.url, "./main.ts");
