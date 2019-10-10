import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { inspect } from 'util';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LogService implements LoggerService {
  private logger: winston.Logger;

  constructor(private readonly config: ConfigService) {
    this.instantiateWinstonLogger();
  }
  private instantiateWinstonLogger(): void {
    const transports: any[] = [new winston.transports.Console()];

    this.logger = winston.createLogger({
      level: 'info',
      transports,
    });
  }

  private getBaseLogData(): any {
    return {
      time: new Date(),
      service: this.config.getAsString('npm_package_name'),
      version: this.config.getAsString('npm_package_version'),
      env: this.config.getAsString('NODE_ENV'),
    };
  }

  error(message: any, context: any): this {
    this.logger.error({
      level: 'error',
      message: this.format(message),
      context: context.constructor.name,
      ...this.getBaseLogData(),
    });
    return this;
  }

  info(message: any, context: any): this {
    this.logger.info({
      level: 'info',
      message: this.format(message),
      context: context.constructor.name,
      ...this.getBaseLogData(),
    });
    return this;
  }

  debug(message: any, context: any): this {
    this.logger.debug({
      level: 'debug',
      message: this.format(message),
      context: context.constructor.name,
      ...this.getBaseLogData(),
    });
    return this;
  }

  verbose(message: any, context: any): this {
    this.logger.debug({
      level: 'verbose',
      message: this.format(message),
      context: context.constructor.name,
      ...this.getBaseLogData(),
    });
    return this;
  }

  log(message: any, context: any): this {
    this.logger.info({
      level: 'info',
      message: this.format(message),
      context: context.constructor.name,
      ...this.getBaseLogData(),
    });
    return this;
  }

  warn(message: any, context: any): this {
    this.logger.warn({
      level: 'warn',
      message: this.format(message),
      context: context.constructor.name,
      ...this.getBaseLogData(),
    });
    return this;
  }

  private format(message: any): string {
    return inspect(message, {
      colors: false,
      showHidden: false,
      depth: 10,
    });
  }
}
