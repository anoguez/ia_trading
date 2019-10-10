import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('trade_statistic')
export class TradeStatisticEntity {

  @PrimaryGeneratedColumn()
  id: number;

}