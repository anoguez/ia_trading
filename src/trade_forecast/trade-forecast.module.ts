import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeForecastService } from "./trade-forecast.service";
import { TradeForecastEntity } from './trade-forecast.entity';
import { TradeForecastController } from './trade-forecast.controller';
import { BuildTrainDataDTO } from "./dto/build-train-data.dto";

@Module({
  imports: [TypeOrmModule.forFeature([TradeForecastEntity])],
  providers: [TradeForecastService, BuildTrainDataDTO],
  controllers: [TradeForecastController]
})

export class TradeForecastModule { }
