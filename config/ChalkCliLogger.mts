import chalk from "chalk";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";

export class ChalkCliLogger {
  constructor(private readonly context: string) {}

  debug = (message: string) =>
    console.debug(this.toContextualize(chalk.bold.blue("debug"), message));
  success = (message: string) =>
    console.log(this.toContextualize(chalk.green("info"), chalk.green(message)));
  info = (message: string) => console.log(this.toContextualize(chalk.green("info"), message));
  warn = (message: string) => console.warn(this.toContextualize(chalk.yellow("warn"), message));
  error = (message: string) => console.error(this.toContextualize(chalk.red("error"), message));

  private toContextualize = (level: string, message: string) =>
    `${chalk.bold(new Date().toISOString())} ${level} ${chalk.bold(this.context)}: ${message}`;
}

const loggerContextMap = new Map<string, ChalkCliLogger>();
export const getLogger = (moduleUrl: string): ChalkCliLogger => {
  const context = basename(fileURLToPath(moduleUrl));
  const existing = loggerContextMap.get(context);
  if (existing) {
    return existing;
  }

  const logger = new ChalkCliLogger(context);
  loggerContextMap.set(context, logger);
  return logger;
};
