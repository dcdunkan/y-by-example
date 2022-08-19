const CONTENTS: string[] = [];

for await (const { name } of Deno.readDir("contents")) {
  CONTENTS.push(name.split(".")[0]);
}

const index = CONTENTS.indexOf("contents");
if (index > -1) CONTENTS.splice(index, 1);

export { CONTENTS };
