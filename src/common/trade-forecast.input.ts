import { TradeForecastEntity } from "src/trade_forecast/trade-forecast.entity";
import { IsNumber, IsString } from 'class-validator';

export class TradeForecastDTO {

  @IsString()
  readonly symbol: string;

  @IsNumber()
  readonly open: number;

  @IsNumber()
  readonly high: number;

  @IsNumber()
  readonly low: number;

  @IsNumber()
  readonly close: number;

  @IsNumber()
  readonly ma1_value: number;

  @IsNumber()
  readonly ma2_value: number;
}

export class TradeForecastInput {

  open: number;
  high: number;
  low: number;
  close: number;
  ma1_value: number;
  ma2_value: number;

  constructor(input: TradeForecastEntity) {
    this.open = Number(input.open);
    this.high = Number(input.high);
    this.low = Number(input.low);
    this.close = Number(input.close);
    this.ma1_value = Number(input.ma1_value);
    this.ma2_value = Number(input.ma2_value);
  }

  //  { open: number, high: number, low: number, close: number}
  getInputValues(): Object {
    return {
      open: this.open,
      high: this.high,
      low: this.low,
      close: this.close,
      ma1_value: this.ma1_value,
      ma2_value: this.ma2_value
    };
  }
}