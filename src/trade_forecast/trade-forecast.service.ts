import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeForecastEntity } from './trade-forecast.entity';
import { TradeUtilsDTO } from './dto/build-train-data.dto';
import { BrainJsLib } from 'src/_core/brainjs/brainjs.lib';
import { TradePreviewDTO } from './dto/trade-preview.dto';
import { TradeSaveDataDTO } from './dto/trade-save-data.dto';

@Injectable()
export class TradeForecastService {
  constructor(
    @InjectRepository(TradeForecastEntity)
    private readonly tradeForecastRepository: Repository<TradeForecastEntity>,
    private readonly tradeUtils: TradeUtilsDTO
  ) { }

  async getPreview(inputData: TradePreviewDTO): Promise<Object> {

    const net = new BrainJsLib().getRecurrentLSTMTimeStep({
      inputSize: 6,
      outputSize: 6,
      hiddenLayers: [12, 12]
    });

    let results = await this.tradeForecastRepository.find({ order: { date: "DESC" }});

    if (!results.length) return { msg: 'No data found' };

    let rawData = await this.tradeUtils.buildData(results);
    const scaledData = rawData.map(v => this.tradeUtils.scaleDown(v));

    let trainingData = this.tradeUtils.chunkArray(scaledData);

    net.train(trainingData, {
      learningRate: 0.005,
      errorThresh: 0.02
    });

    const checkData = this.tradeUtils.scaleDown({
      open: inputData.open,
      high: inputData.high,
      low: inputData.low,
      close: inputData.close,
      ma1_value: inputData.ma1_value,
      ma2_value: inputData.ma2_value,
      volume: inputData.volume
    });

    return this.tradeUtils.scaleUp(net.run([checkData]), rawData[0]);
  }

  async getForecast(): Promise<Object[]> {
    const net = new BrainJsLib().getRecurrentLSTMTimeStep({
      inputSize: 6,
      outputSize: 6,
      hiddenLayers: [6, 6]
    });

    let results = await this.tradeForecastRepository.find({ 
      order: { date: "DESC" },
      take: 20
    });

    if (!results.length) throw new Error('No data found');

    let rawData = await this.tradeUtils.buildData(results);
    const scaledData = rawData.map(v => this.tradeUtils.scaleDown(v));
    let trainingData = this.tradeUtils.chunkArray(scaledData);

    net.train(trainingData, {
      learningRate: 0.005,
      errorThresh: 0.02
    });

    return net.forecast<Array<any>>([
      trainingData[0][0],
      trainingData[0][1],
    ], 4).map(v => this.tradeUtils.scaleUp(v, rawData[0]));

  }

  async save(inputData: TradeSaveDataDTO): Promise<Object> {
    await this.tradeForecastRepository.save(inputData);
    return { msg: "Ok!" };
  }

}
