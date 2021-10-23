import chalk from 'chalk';

export class ChalkCliLogger {
  constructor(private readonly context: string) {}

  debug = (message: string) =>
    console.debug(this.toContextualize(chalk.bold.blue('debug'), message));
  success = (message: string) =>
    console.log(this.toContextualize(chalk.green('info'), chalk.green(message)));
  info = (message: string) => console.log(this.toContextualize(chalk.green('info'), message));
  warn = (message: string) => console.warn(this.toContextualize(chalk.yellow('warn'), message));
  error = (message: string) => console.error(this.toContextualize(chalk.red('error'), message));

  private toContextualize = (level: string, message: string) =>
    `${chalk.bold(new Date().toISOString())} ${level} ${chalk.bold(this.context)}: ${message}`;
}

const loggerContextMap = new Map<string, ChalkCliLogger>();
export const getLogger = (context: string): ChalkCliLogger =>
  loggerContextMap.get(context) ??
  (loggerContextMap
    .set(context, new ChalkCliLogger(context))
    .get(context) as ChalkCliLogger);
