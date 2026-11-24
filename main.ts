// Two Lines to Your Past Self — make.fun bounty entry
// u-suga-two-lines-to-your-past-self-f36c83ca
//
// A tiny Node 22 program with no dependencies and no network access.
// It holds the two-line entry, validates it against the kit rules
// (exactly two lines, one sentence each, 1 to 280 characters total),
// writes it to <output dir>/entry.txt, reads it back and verifies
// the bytes match before exiting.
//
// Run locally:  OUTPUT_DIR=./out node main.ts
// The grader runs it with /output as the output directory.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself. Line one warns the past self about one specific
// moment (2 a.m., a hospital car park, a phone call, the words
// "I'm fine"); line two traces what that moment cost.
const LINE_ONE =
  "When Mum rings from the hospital car park at 2 a.m. and asks how you are, " +
  "don't say \"I'm fine\" — say you're scared and ask her to stay on the line.";
const LINE_TWO =
  "It was the last call she ever made, and that one lie cost me six years " +
  "of wishing I'd kept her talking for one more minute.";

const ENTRY_FILE = "entry.txt";
const MAX_CHARS = 280;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Count characters the way the gate does: Unicode code points,
// so an em dash or an apostrophe counts as one character each.
function charCount(text: string): number {
  return [...text].length;
}

// Each line must be exactly one sentence: it ends with a single
// terminal full stop and holds no other sentence boundary. A boundary
// is a . ! or ? followed by a space and a capital letter (the next
// sentence starting) or standing at the very end — so the periods
// inside "2 a.m." do not count, while a second real sentence does.
function checkOneSentence(line: string, label: string): void {
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    fail(`${label} is empty`);
  }
  if (!trimmed.endsWith(".")) {
    fail(`${label} does not end with a full stop: ${JSON.stringify(line)}`);
  }
  const body = trimmed.slice(0, -1);
  const boundary = /[.!?](?=\s+[A-Z])|[!?]/;
  if (boundary.test(body)) {
    fail(`${label} holds more than one sentence: ${JSON.stringify(line)}`);
  }
}

function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    fail("entry is only white space");
  }
  const chars = charCount(text);
  if (chars < 1 || chars > MAX_CHARS) {
    fail(`entry is ${chars} characters, outside the 1 to ${MAX_CHARS} range`);
  }
  // The entry is two lines plus one trailing newline. Splitting on
  // "\n" leaves a final empty piece from that newline; drop exactly
  // that piece so the line count is the lines themselves, not the
  // terminator. Any other empty piece is a real blank line and fails.
  const rawLines = text.split("\n");
  if (rawLines[rawLines.length - 1] !== "") {
    fail("entry must end with a single trailing newline");
  }
  const lines = rawLines.slice(0, -1);
  if (lines.length !== 2) {
    fail(`entry has ${lines.length} lines, expected exactly 2`);
  }
  if (lines.some((line) => line.trim().length === 0)) {
    fail("entry holds a blank line");
  }
  checkOneSentence(lines[0], "line one");
  checkOneSentence(lines[1], "line two");
}

function main(): void {
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  const entryText = `${LINE_ONE}\n${LINE_TWO}\n`;

  // Validate before touching the disk: a bad entry must fail loudly
  // instead of writing a file the gate would refuse.
  validateEntry(entryText);

  // Create the output directory only. Never remove it: the grader's
  // /output is a mount point and deleting it throws EBUSY.
  mkdirSync(outputDir, { recursive: true });

  const target = join(outputDir, ENTRY_FILE);
  writeFileSync(target, entryText, "utf8");

  // Read back and verify byte-exact: what the judge reads must be
  // exactly what we validated.
  const written = readFileSync(target, "utf8");
  if (written !== entryText) {
    fail(`read-back mismatch in ${target}`);
  }

  console.log(
    `wrote ${target} (${charCount(entryText)} characters, 2 lines)`,
  );
}

main();
