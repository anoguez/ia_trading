import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeStatisticEntity } from './trade-statistic.entity';
import { PaginationOptionsInterface, Pagination } from 'src/_core/pagination';

@Injectable()
export class TradeStatisticService {
  constructor(
    @InjectRepository(TradeStatisticEntity)
    private readonly tradeStatisticRepository: Repository<TradeStatisticEntity>,
  ) { }

  async findAll(filter, pagOptions: PaginationOptionsInterface): Promise<Pagination<TradeStatisticEntity>> {

    const [results, total] = await this.tradeStatisticRepository.findAndCount({
      take: pagOptions.limit,
      skip: pagOptions.page,
      where: filter
    });

    return new Pagination<TradeStatisticEntity>({
      results,
      total
    });
  }

  async findOne(id: number): Promise<TradeStatisticEntity> {
    let p = await this.tradeStatisticRepository.findOne({ id });
    return p;
  }

}
