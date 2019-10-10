import { Resolver, Query, Args } from '@nestjs/graphql';
import { TradeStatisticEntity } from './trade-statistic.entity';
import { TradeStatisticService } from './trade-statistic.service';
import { PaginationOptionsInterface, Pagination } from 'src/_core/pagination';

@Resolver('TradeStatistic')
export class TradeStatisticResolver {

  constructor(private readonly tradeStatisticService: TradeStatisticService) { }

  @Query(() => Pagination)
  async registres(@Args('limit') limit: number, @Args('page') page: number): Promise<Pagination<TradeStatisticEntity>> {
    let filter = {};
    let pagination: PaginationOptionsInterface = { limit, page };

    return this.tradeStatisticService.findAll(filter, pagination)
  }

} 