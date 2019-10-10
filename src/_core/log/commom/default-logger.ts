import { Injectable, LoggerService } from '@nestjs/common';
import { LogService } from '../log.service';
import * as util from 'util';

@Injectable()
export class DefaultLogger implements LoggerService {
  constructor(private readonly logger: LogService) { }

  debug(message: any, context?: string): any {
    this.logger.debug(util.inspect(message), context && { context });
  }

  error(message: any, trace?: string, context?: string): any {
    this.logger.error(util.inspect(message), message);
  }

  log(message: any, context?: string): any {
    this.logger.info(util.inspect(message), context && { context });
  }

  verbose(message: any, context?: string): any {
    this.logger.verbose(util.inspect(message), context && { context });
  }

  warn(message: any, context?: string): any {
    this.logger.warn(util.inspect(message), context && { context });
  }
}
