import { Module, OnModuleInit } from "@nestjs/common";
import { CoreModule } from "./_core/core.module";
import { Connection } from 'typeorm';
import { ModuleRef } from "@nestjs/core";
import { TradeForecastModule } from "./trade_forecast/trade-forecast.module";

@Module({
  imports: [
    CoreModule,
    TradeForecastModule
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
