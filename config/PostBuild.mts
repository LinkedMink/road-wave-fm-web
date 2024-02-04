#!/usr/bin/env node

import fs from "node:fs/promises";
import { getLogger } from "./ChalkCliLogger.mjs";

const logger = getLogger(import.meta.url);
logger.info("Start Post-Build");

await fs.copyFile("LICENSE.md", "dist/docs/LICENSE.md");
logger.info("Removed: dist/config.sample.json");

try {
  await fs.rm("dist/config.sample.json");
  logger.info("Removed: dist/config.sample.json");
} catch (e) {
  logger.warn("No File: dist/config.sample.json");
}

try {
  await fs.rm("dist/config.json");
  logger.info("Removed: dist/config.json");
} catch (e) {
  logger.warn("No File: dist/config.json");
}

if (Boolean(process.env.DEPLOY_TO_AWS_AMPLIFY) === true) {
  logger.debug("Writting deployed config.json");

  if (
    !process.env.URL_USER_API ||
    !process.env.URL_ROAD_WAVE_API ||
    !process.env.GOOGLE_MAPS_API_KEY ||
    !process.env.USER_API_JWT_PUBLIC_KEY
  ) {
    logger.error("Must set environment variables when deploying with AWS Amplify");
    process.exit(1);
  }

  const logLevelNum = Number(process.env.LOG_LEVEL);
  const logLevel = isNaN(logLevelNum) ? 0 : logLevelNum;
  const config = {
    urls: {
      user: process.env.URL_USER_API,
      roadWave: process.env.URL_ROAD_WAVE_API,
    },
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    jwtPublicKey: process.env.USER_API_JWT_PUBLIC_KEY,
    logLevelConsole: logLevel,
    logLevelPersist: logLevel,
  };

  await fs.writeFile("dist/config.json", JSON.stringify(config));
  logger.info("Write: dist/config.json");
} else {
  logger.debug("Target environment does not require prebuilt config.json");
}

logger.success(`End Post-Build Success!`);
