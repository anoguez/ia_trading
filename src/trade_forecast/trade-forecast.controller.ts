import { Controller, Post, Body } from '@nestjs/common';
import { TradeForecastService } from './trade-forecast.service';
import { TradeSaveDataDTO } from 'src/trade_forecast/dto/trade-save-data.dto';
import { TradePreviewDTO } from './dto/trade-preview.dto';
import { TradeForecastDTO } from './dto/trade-forecast.dto';

@Controller('trade_forecast')
export class TradeForecastController {

  constructor(public service: TradeForecastService) { }

  @Post("preview")
  getPreview(@Body() inputData: TradePreviewDTO): Promise<Object> {
    return this.service.getPreview(inputData);
  }
 
  @Post("forecast")
  getForecast(): Promise<Object[]> {
    return this.service.getForecast();
  }

  @Post("save")
  save(@Body() inputData: TradeSaveDataDTO): Promise<Object> {
    return this.service.save(inputData);
  }

}