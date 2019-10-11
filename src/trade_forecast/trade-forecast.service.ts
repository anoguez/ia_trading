import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeForecastEntity } from './trade-forecast.entity';
import { PaginationOptionsInterface, Pagination } from 'src/_core/pagination';

@Injectable()
export class TradeForecastService {
  constructor(
    @InjectRepository(TradeForecastEntity)
    private readonly tradeForecastRepository: Repository<TradeForecastEntity>,
  ) { }

  async findAll(filter, pagOptions: PaginationOptionsInterface): Promise<Pagination<TradeForecastEntity>> {

    const [results, total] = await this.tradeForecastRepository.findAndCount({
      take: pagOptions.limit,
      skip: pagOptions.page,
      where: filter
    });

    return new Pagination<TradeForecastEntity>({
      results,
      total
    });
  }

  async findOne(id: number): Promise<TradeForecastEntity> {
    let p = await this.tradeForecastRepository.findOne({ id });
    return p;
  }

}
