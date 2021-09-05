import fg from "fast-glob";
import * as core from "@actions/core";

export function getInputAsArray(name: string, options?: core.InputOptions): string[] {
  return core
    .getInput(name, options)
    .split("\n")
    .map((s) => s.trim())
    .filter((x) => x !== "");
}

export async function resolvePattern(root: string, patterns: string[]): Promise<string[]> {
  return fg(patterns, {
    cwd: root,
    absolute: true,
    markDirectories: true,
    onlyFiles: false,
  });
}
