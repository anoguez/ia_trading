import { Injectable } from "@nestjs/common";
import { TradeForecastInput } from "src/common/trade-forecast.input";
import { TradeForecastEntity } from "../trade-forecast.entity";

@Injectable()
export class BuildTrainDataDTO {

  async buildData(results: TradeForecastEntity[]) {

    let rawData = [];

    for (let i = 1; i < results.length; i++) {
      rawData.push(new TradeForecastInput(results[i]).getInputValues());
    }

    return rawData
  }

  // (open - lowest) / (highest - lowest)
  scaleDown(step) {
    let a = {};

    for (const key in step) {
      const divide = (step.high - step.low);
      a[key] = divide > 0 ? (step[key] - step.low) / divide : 0;
    }

    return a;
  }

  // normalizedValue * (highest - lowest) + lowest
  scaleUp(step, rawStep) {
    let a = {};

    for (const key in step) {
      a[key] = step[key] * (rawStep.high - rawStep.low) + rawStep.low;
    }

    return a;
  }

}