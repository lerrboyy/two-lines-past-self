# Two Lines to Your Past Self

[![Competition](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)
[![Rank](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/lerrboyy/two-lines-past-self/rank.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)
[![Reward](https://make.fun/badge/u-suga-two-lines-to-your-past-self-f36c83ca/lerrboyy/two-lines-past-self/reward.svg)](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca)

A make.fun bounty entry for [Two Lines to Your Past Self](https://make.fun/bounty/u-suga-two-lines-to-your-past-self-f36c83ca).

## The entry

> When Mum rings from the hospital car park at 2 a.m. and asks how you are, don't say "I'm fine" — say you're scared and ask her to stay on the line.
>
> It was the last call she ever made, and that one lie cost me six years of wishing I'd kept her talking for one more minute.

Two lines, 272 characters including the trailing newline — inside the gate's 1 to 280 character limit.

Line one warns the past self about one specific moment: a time (2 a.m.), a place (the hospital car park), a phone call, and the exact words said out loud ("I'm fine"). Line two traces what that moment cost: it was the last call she ever made, and one small lie bought six years of wishing for one more minute of her voice. The moment is tiny; the price is total. That gap is the whole entry.

## How the program works

`main.ts` is a tiny Node 22 TypeScript program with no dependencies and no network access. It:

1. Holds the two lines as data.
2. Validates them before touching the disk — exactly two lines, each exactly one sentence (a single terminal full stop, no other sentence-ending punctuation inside), total length within the gate's 1 to 280 characters, and not only white space. Any failure exits non-zero with a loud message.
3. Creates the output directory with recursive `mkdir` only — it never deletes or removes the output directory itself, because the grader's `/output` is a mount point.
4. Writes the entry to `<output dir>/entry.txt`.
5. Reads the file back and verifies it is byte-exact before exiting, so what the judge reads is exactly what was validated.

The run is fully deterministic: no randomness, no clock, no environment dependence beyond where the output goes.

## How to run locally

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

Requires Node 22.18 or later (the grader runs Node 22.23.4). On Node 22.6 to 22.17, run it as `node --experimental-strip-types main.ts`.

## License

MIT — see [LICENSE](LICENSE).
