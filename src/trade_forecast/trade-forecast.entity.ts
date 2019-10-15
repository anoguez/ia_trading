import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNumber, IsEnum } from 'class-validator';
import { GraphicTimeEnum } from 'src/common/graphic.enum';

@Entity('trade_forecast')
export class TradeForecastEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @Column()
  date: Date;

  @IsEnum(GraphicTimeEnum)
  graphic_time: GraphicTimeEnum;

  @Column()
  @IsNumber()
  open: number;

  @Column()
  @IsNumber()  
  high: number;

  @Column()
  @IsNumber()
  low: number;

  @Column()
  @IsNumber()
  close: number;

  @Column()
  @IsNumber()
  ma1_value: number;

  @Column()
  @IsNumber()
  ma2_value: number;

}