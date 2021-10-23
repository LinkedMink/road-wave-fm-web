#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { getLogger } from './ChalkCliLogger';

const main = async (): Promise<number> => {
  const logger = getLogger(path.basename(__filename));
  logger.info('Start Post-Build');

  try {
    await fs.rm('build/config.sample.json');
    logger.info('Removed: build/config.sample.json');
  } catch (e) {
    logger.warn('No File: build/config.sample.json');
  }

  try {
    await fs.rm('build/config.json');
    logger.info('Removed: build/config.json');
  } catch (e) {
    logger.warn('No File: build/config.json');
  }

  if (Boolean(process.env.DEPLOY_TO_AWS_AMPLIFY) === true) {
    logger.debug('Writting deployed config.json');

    if (
      !process.env.URL_USER_API ||
      !process.env.URL_ROAD_WAVE_API ||
      !process.env.GOOGLE_MAPS_API_KEY ||
      !process.env.USER_API_JWT_PUBLIC_KEY
    ) {
      logger.error('Must set environment variables when deploying with AWS Amplify');
      return 1;
    }

    const logLevelNum = Number(process.env.LOG_LEVEL);
    const logLevel = isNaN(logLevelNum) ? 0 : logLevelNum;
    const config = {
      urls: {
        user: process.env.URL_USER_API,
        roadWave: process.env.URL_ROAD_WAVE_API,
      },
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      jwtPublicKey: process.env.USER_API_JWT_PUBLIC_KEY,
      logLevelConsole: logLevel,
      logLevelPersist: logLevel,
    };

    await fs.writeFile('build/config.json', JSON.stringify(config));
    logger.info('Write: build/config.json');
  } else {
    logger.debug('Target environment does not require prebuilt config.json');
  }

  logger.success(`End Post-Build Success!`);
  return 0;
};

void main().then((c) => process.exit(c));
