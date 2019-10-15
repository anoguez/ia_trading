import { TradeForecastEntity } from "src/trade_forecast/trade-forecast.entity";
import { IsNumber, IsString, IsDate, IsInt, IsNumberString, IsEnum } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { DateTransformer } from "../../common/date.transformer";
import { EnumTransformer } from "../../common/enum.transformer";
import { GraphicTimeEnum } from "../../common/graphic.enum";

export class TradeSaveDataDTO {

  @IsString()
  readonly symbol: string;

  @Transform(value => DateTransformer(value))
  @IsDate()
  readonly date: Date;

  @IsEnum(GraphicTimeEnum)
  @Transform(value => EnumTransformer(value, GraphicTimeEnum))
  readonly graphic_time;

  @Type(() => Number)
  @IsNumber()
  readonly open: number;

  @Type(() => Number)
  @IsNumber()
  readonly high: number;

  @Type(() => Number)
  @IsNumber()
  readonly low: number;

  @Type(() => Number)
  @IsNumber()
  readonly close: number;

  @Type(() => Number)
  @IsNumber()
  readonly ma1_value: number;

  @Type(() => Number)
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