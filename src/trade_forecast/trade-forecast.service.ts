import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeForecastEntity } from './trade-forecast.entity';
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

  async getPreview(inputData?): Promise<Object> {

    const net = new BrainJsLib().getRecurrentLSTMTimeStep({
      inputSize: 6,
      outputSize: 6,
      hiddenLayers: [12, 12]
    });

    let results = await this.tradeForecastRepository.find();

    if (!results.length) return { msg: 'No data found' };

    let rawData = await this.buildTrainDataDTO.buildData(results);

    const scaledData = rawData.map(v => this.buildTrainDataDTO.scaleDown(v));

    let trainingData = [];

    const chunk = 5;
    for (let i = 0, j = scaledData.length; i < j; i += chunk) {
      trainingData.push(scaledData.slice(i, i + chunk));
    }

    net.train(trainingData, {
      learningRate: 0.005,
      errorThresh: 0.02
    });

    return this.buildTrainDataDTO.scaleUp(net.run(trainingData[0]), rawData[0]);
  }

  async save(inputData: TradeForecastDTO): Promise<Object> {
    await this.tradeForecastRepository.save(inputData);
    return { msg: "Ok!" };
  }

}
