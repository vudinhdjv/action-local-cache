import { setFailed } from "@actions/core";
import { mkdirP, mv, rmRF } from "@actions/io";
import { exists } from "@actions/io/lib/io-util";

import { getVars } from "./lib/getVars";
import log from "./lib/log";

async function post(): Promise<void> {
  try {
    const { cacheTargets } = getVars();

    for (const target of cacheTargets) {
      if (await exists(target.targetPath)) {
        await mkdirP(target.cacheDir);
        await rmRF(target.cachePath);
        await mv(target.targetPath, target.cachePath);
      } else {
        log.info(`Skipping: target not found for ${target.targetPath}.`);
      }
    }
  } catch (error) {
    log.trace(error);
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

post();
