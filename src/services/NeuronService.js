import { Perceptron, Adaline, MultiLayerNetwork } from '@/models';
import { classToType } from '@/lib';
import {
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,
  ADALINE_WEIGHTS_INITIAL_LOWER_BOUND,
  ADALINE_WEIGHTS_INITIAL_UPPER_BOUND,
} from '@/const';


class NeuronService {
  constructor() {
    this.model = null;
  }

  get status() {
    return this.model.formatedStatus;
  }

  get epoch() {
    return this.model.epoch;
  }

  setPerceptron(learningRate, maxEpoch) {
    this.model = new Perceptron(learningRate, maxEpoch, {
      upperBound: UPPER_SCALE_DOMAIN,
      lowerBound: LOWER_SCALE_DOMAIN,
    });
  }

  setAdaline(learningRate, maxEpoch, desiredError) {
    this.model = new Adaline(desiredError, learningRate, maxEpoch, {
      upperBound: ADALINE_WEIGHTS_INITIAL_LOWER_BOUND,
      lowerBound: ADALINE_WEIGHTS_INITIAL_UPPER_BOUND,
    });
  }

  setMLN(hiddenLayers, layerNeurones) {
    // TODO: use contants
    this.model = new MultiLayerNetwork(2, 2, hiddenLayers, layerNeurones);
  }

  train(...args) {
    return this.model.startTraining(...args);
  }

  classifyInput(input) {
    const output = this.model.classifyInput(input);

    if (this.model instanceof MultiLayerNetwork) {
      return classToType(output);
    }

    return output;
  }

  getLine(weights) {
    return {
      point1: [UPPER_SCALE_DOMAIN, this.model.lineFn(UPPER_SCALE_DOMAIN, weights)],
      point2: [LOWER_SCALE_DOMAIN, this.model.lineFn(LOWER_SCALE_DOMAIN, weights)],
    };
  }
}

export default new NeuronService();
