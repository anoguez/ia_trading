import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeForecastEntity } from './trade-forecast.entity';
import { PaginationOptionsInterface, Pagination } from 'src/_core/pagination';
import { BuildTrainDataDTO } from './dto/build-train-data.dto';
import { BrainJsLib } from 'src/_core/brainjs/brainjs.lib';
import { TradeForecastDTO } from 'src/common/trade-forecast.input';

@Injectable()
export class TradeForecastService {
  constructor(
    @InjectRepository(TradeForecastEntity)
    private readonly tradeForecastRepository: Repository<TradeForecastEntity>,
    private readonly buildTrainDataDTO: BuildTrainDataDTO
  ) { }

  async test(inputData?: TradeForecastDTO): Promise<Object> {

    const net = new BrainJsLib().getRecurrentLSTMTimeStep({
      inputSize: 6,
      outputSize: 6,
      hiddenLayers: [12, 12]
    });
    
    let results = await this.tradeForecastRepository.find();
    let rawData = await this.buildTrainDataDTO.buildData(results);    

    const scaledData = rawData.map(v => this.buildTrainDataDTO.scaleDown(v));

    const trainingData = [
      scaledData.slice(0, 5)
    ];

    net.train(trainingData, {
      learningRate: 0.005,
      errorThresh: 0.02
    });

    return this.buildTrainDataDTO.scaleUp(net.run(trainingData[0]), rawData[0]);    
  }

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
