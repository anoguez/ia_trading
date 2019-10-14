import { NeuralNetwork, INeuralNetworkOptions, recurrent, IRNNDefaultOptions } from 'brain.js';

export class BrainJsLib {

  private configNeuralNet: INeuralNetworkOptions = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
  }

  constructor() {
  }

  getNeuralNetwork(config?: INeuralNetworkOptions) {
    return new NeuralNetwork(config || this.configNeuralNet);
  }

  getRecurrentLSTMTimeStep(options?: IRNNDefaultOptions): recurrent.LSTMTimeStep {
    return new recurrent.LSTMTimeStep(options);
  }

}