import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogInterceptor } from './log.interceptor';
import { ConfigModule } from '../../_core/config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [ConfigModule, ConfigService],
  providers: [LogService, LogInterceptor],
  exports: [LogService, LogInterceptor],
})
export class LogModule {}
