import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('trade_forecast')
export class TradeForecastEntity {

  @PrimaryGeneratedColumn()
  id: number;

}