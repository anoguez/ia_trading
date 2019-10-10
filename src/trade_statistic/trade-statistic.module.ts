import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeStatisticService } from "./trade-statistic.service";
import { TradeStatisticEntity } from './trade-statistic.entity';
import { TradeStatisticResolver } from "./trade-statistic.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([TradeStatisticEntity])],
  providers: [TradeStatisticResolver, TradeStatisticService],
})

export class TradeStatisticModule { }
