import { setFailed } from "@actions/core";
import { mkdirP, mv } from "@actions/io";

import { getVars } from "./lib/getVars";
import log from "./lib/log";

async function post(): Promise<void> {
  try {
    const { cacheTargets } = getVars();

    for (const target of cacheTargets) {
      await mkdirP(target.cacheDir);
      await mv(target.targetPath, target.cachePath, { force: true });
    }
  } catch (error) {
    log.trace(error);
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

post();
