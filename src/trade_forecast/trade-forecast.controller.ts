import { Controller, Post, Body } from '@nestjs/common';
import { TradeForecastService } from './trade-forecast.service';
import { TradeForecastDTO } from 'src/common/trade-forecast.input';

@Controller('trade_forecast')
export class TradeForecastController {

  constructor(public service: TradeForecastService) { }

  @Post()
  test(@Body() inputData?): Promise<Object> {
    return this.service.test(inputData);
  }

}