import { setFailed, setOutput } from "@actions/core";
import { cp, mkdirP } from "@actions/io/";
import { exists } from "@actions/io/lib/io-util";

import { getVars } from "./lib/getVars";
import log from "./lib/log";

async function main(): Promise<void> {
  try {
    const { cacheTargets } = getVars();

    let hitCache = false;
    for (const target of cacheTargets) {
      if (await exists(target.cachePath)) {
        await mkdirP(target.targetDir);
        await cp(target.cachePath, target.targetPath, { recursive: true, force: true });
        log.info(`Cache found and restored to ${target.origPath}`);
        hitCache = true;
      } else {
        log.info(`Skipping: cache not found for ${target.origPath}.`);
      }
    }
    setOutput("cache-hit", hitCache);
  } catch (error) {
    console.trace(error);
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

main();
