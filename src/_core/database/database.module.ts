import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { ConfigService } from "../config/config.service";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.getAsString("APP_MYSQL_HOST"),
        port: config.getAsInt("APP_MYSQL_PORT"),
        username: config.getAsString("APP_MYSQL_ROOT"),
        password: config.getAsString("APP_MYSQL_PASSWORD"),
        database: config.getAsString("APP_MYSQL_DATABASE"),
        entities: [
          __dirname + '/../../**/*.entity{.ts,.js}',
        ],
        logging: ['query', 'error'],
        synchronize: false,
      }),
    })
  ],
  exports: [TypeOrmModule],
})

export class DatabaseModule { }