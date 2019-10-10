import { Module, OnModuleInit } from "@nestjs/common";
import { CoreModule } from "./_core/core.module";
import { Connection } from 'typeorm';
import { ModuleRef } from "@nestjs/core";
import { TradeStatisticModule } from "./trade_statistic/trade-statistic.module";

@Module({
  imports: [
    CoreModule,
    TradeStatisticModule
  ],
  providers: [],
})

export class AppModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly connection: Connection
  ) { }

  async onModuleInit(): Promise<void> {
  }
}
