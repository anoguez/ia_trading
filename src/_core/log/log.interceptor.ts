import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogService } from './log.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor<any, any> {
  constructor(private readonly logger: LogService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const raw = req.raw || req;
    const start = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `${raw.method} ${raw.url} [${Date.now() - start}ms]`,
            this,
          ),
        ),
      );
  }
}
