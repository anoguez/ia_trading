import { Module } from '@nestjs/common';
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from './database/database.module';
// import { GraphqlModule } from './graphql/graphql.module';
import { LogModule } from './log/log.module';
import { BrainJsModule } from './brainjs/brainjs.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    // GraphqlModule,
    BrainJsModule,
    LogModule,
  ],
})

export class CoreModule { }