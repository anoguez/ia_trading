import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OrderTypeEnum } from 'src/common/order.enum';
import { IsNumber } from 'class-validator';

@Entity('trade_forecast')
export class TradeForecastEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;  

  @Column()
  graphic_time: string;

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