import * as Winston from 'winston';
import * as util from 'util';
import { ILoggerOptions } from './logger-options';

export class Logger {
  constructor(
    private readonly winston: Winston.Logger,
    private readonly opts: ILoggerOptions,
  ) { }

  info(message: string, meta?: any): this {
    this.winston.info({
      level: 'info',
      message,
      meta,
      ...this.opts,
    });
    return this;
  }

  warn(message: string, meta?: any): this {
    this.winston.warn({
      level: 'warn',
      message,
      meta,
      ...this.opts,
    });
    return this;
  }

  error(message: string, error: Error, meta?: any): this {
    this.winston.error({
      level: 'error',
      message,
      error: util.inspect(error),
      meta,
      ...this.opts,
    });
    return this;
  }

  debug(message: string, meta?: any): this {
    this.winston.debug({
      level: 'debug',
      message,
      meta,
      ...this.opts,
    });
    return this;
  }

  verbose(message: string, meta?: any): this {
    this.winston.debug({
      level: 'verbose',
      message,
      meta,
      ...this.opts,
    });
    return this;
  }
}
