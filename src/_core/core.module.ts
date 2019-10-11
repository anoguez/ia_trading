import { Module } from '@nestjs/common';
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from './database/database.module';
// import { GraphqlModule } from './graphql/graphql.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    // GraphqlModule,
    LogModule,
  ],
})

export class CoreModule { }