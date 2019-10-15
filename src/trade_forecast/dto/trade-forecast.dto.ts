import { TradeForecastEntity } from "src/trade_forecast/trade-forecast.entity";
import { IsNumber, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { DateTransformer } from "../../common/date.transformer";
import { EnumTransformer } from "../../common/enum.transformer";
import { GraphicTimeEnum } from "../../common/graphic.enum";

export class TradeForecastDTO {

  @IsString()
  readonly symbol: string;

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