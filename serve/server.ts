import express from 'express';
import fs from 'fs';
import path from 'path';

const jwtPublicKeyFile = process.env.JWT_PUBLIC_KEY_FILE
  ? process.env.JWT_PUBLIC_KEY_FILE
  : 'jwtRS256.key.pub';

const jwtPublicKey = Buffer.from(fs.readFileSync(jwtPublicKeyFile, 'utf8')).toString('base64');

console.log(`Loaded ${jwtPublicKeyFile}`);

const logLevelConsole = process.env.LOG_LEVEL_CONSOLE
  ? process.env.LOG_LEVEL_CONSOLE.toUpperCase()
  : 'WARN';

const logLevelPersist = process.env.LOG_LEVEL_PERSIST
  ? process.env.LOG_LEVEL_PERSIST.toUpperCase()
  : 'INFO';

const config = {
  urls: {
    user: process.env.USER_SERVICE_URL,
  },
  jwtPublicKey,
  logLevelConsole,
  logLevelPersist,
};

Object.keys(config.urls).forEach((key) => {
  if (!config.urls[key]) {
    console.error(`ERROR: Missing value for url environment variable ${key}`);
    process.exit(1);
  }
});

const app = express();

app.use(express.static('public'));

app.get('/config', function (req, res) {
  res.send(config);
  res.status(200);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join('public', 'index.html'));
  res.status(200);
});

app.listen(80);
