import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeForecastEntity } from './trade-forecast.entity';
import { BuildTrainDataDTO } from './dto/build-train-data.dto';
import { BrainJsLib } from 'src/_core/brainjs/brainjs.lib';
import { TradePreviewDTO } from './dto/trade-preview.dto';
import { TradeForecastDTO } from './dto/trade-forecast.dto';
import { TradeSaveDataDTO } from './dto/trade-save-data.dto';

@Injectable()
export class TradeForecastService {
  constructor(
    @InjectRepository(TradeForecastEntity)
    private readonly tradeForecastRepository: Repository<TradeForecastEntity>,
    private readonly buildTrainDataDTO: BuildTrainDataDTO
  ) { }

  async getPreview(inputData: TradePreviewDTO): Promise<Object> {

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

    const checkData = this.buildTrainDataDTO.scaleDown({
      open: inputData.open,
      high: inputData.high,
      low: inputData.low,
      close: inputData.close,
      ma1_value: inputData.ma1_value,
      ma2_value: inputData.ma2_value
    });
 
    return this.buildTrainDataDTO.scaleUp(net.run([checkData]), rawData[0]);
  }

  async getForecast(inputData: TradeForecastDTO): Promise<Object> {
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

    const checkData = {
      open: inputData.open,
      high: inputData.high,
      low: inputData.low,
      close: inputData.close,
      ma1_value: inputData.ma1_value,
      ma2_value: inputData.ma2_value,
    };

    let forecastData = net.forecast([
      trainingData[0][0],
      trainingData[0][1],
    ], 3);
    
    // forecastData.map(v => this.buildTrainDataDTO.scaleUp(v, rawData[0]));

    return forecastData;
  }

  async save(inputData: TradeSaveDataDTO): Promise<Object> {
    await this.tradeForecastRepository.save(inputData);
    return { msg: "Ok!" };
  }

}
