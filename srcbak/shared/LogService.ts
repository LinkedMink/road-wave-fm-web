import store from "../store";
import { isError, isString } from "./TypeCheck";

export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
}

const logServiceMap = new Map<string, LogService>();
let logEntryBuffer: string[] = [];

export class LogService {
  private readonly context: string;
  private readonly levelConsole: LogLevel;
  private readonly levelPersist: LogLevel;

  constructor(context: string) {
    const state = store.getState();
    this.context = context;
    this.levelConsole = state.config.logLevelConsole;
    this.levelPersist = state.config.logLevelPersist;
  }

  static get = (context: string): LogService => {
    const service = logServiceMap.get(context);
    if (service) {
      return service;
    }

    const newService = new LogService(context);
    logServiceMap.set(context, newService);
    return newService;
  };

  static flushBuffer = (): void => {
    // TODO create and connect application log service for client side logging.
    logEntryBuffer = [];
  };

  debug = (object: string | Error | Record<string, unknown>): void => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.Debug) {
      console.debug(contextMessage);
    }

    if (this.levelPersist <= LogLevel.Debug) {
      this.logToBuffer(contextMessage, LogLevel.Debug);
    }
  };

  info = (object: string | Error | Record<string, unknown>): void => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.Info) {
      console.info(contextMessage);
    }

    if (this.levelPersist <= LogLevel.Info) {
      this.logToBuffer(contextMessage, LogLevel.Info);
    }
  };

  warn = (object: string | Error | Record<string, unknown>): void => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.Warn) {
      console.warn(contextMessage);
    }

    if (this.levelPersist <= LogLevel.Warn) {
      this.logToBuffer(contextMessage, LogLevel.Warn);
    }
  };

  error = (object: string | Error | Record<string, unknown>): void => {
    const contextMessage = this.getContextMessage(object);
    if (this.levelConsole <= LogLevel.Error) {
      console.error(contextMessage);
    }

    if (this.levelPersist <= LogLevel.Error) {
      this.logToBuffer(contextMessage, LogLevel.Error);
    }
  };

  getContextMessage = (object: string | Error | Record<string, unknown>): string => {
    let output;
    if (isError(object)) {
      output = object.stack;
    } else if (isString(object)) {
      output = object;
    } else {
      output = JSON.stringify(object);
    }

    return `${this.context} - ${output}`;
  };

  logToBuffer = (message: string, level: LogLevel): void => {
    const dateString = new Date().toUTCString();
    logEntryBuffer.push(`${dateString}: ${level} - ${message}`);
  };
}
