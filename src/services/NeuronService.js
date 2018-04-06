import { Perceptron, Adaline } from '../models';
import {
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,
  ADALINE_WEIGHTS_INITIAL_LOWER_BOUND,
  ADALINE_WEIGHTS_INITIAL_UPPER_BOUND,
} from '../const';


class NeuronService {
  constructor() {
    this.neurone = null;
  }

  get status() {
    return this.neurone.formatedStatus;
  }

  get epoch() {
    return this.neurone.epoch;
  }

  setPerceptron(learningRate, maxEpoch) {
    this.neurone = new Perceptron(learningRate, maxEpoch, {
      upperBound: UPPER_SCALE_DOMAIN,
      lowerBound: LOWER_SCALE_DOMAIN,
    });
  }

  setAdaline(learningRate, maxEpoch, desiredError) {
    this.neurone = new Adaline(desiredError, learningRate, maxEpoch, {
      upperBound: ADALINE_WEIGHTS_INITIAL_LOWER_BOUND,
      lowerBound: ADALINE_WEIGHTS_INITIAL_UPPER_BOUND,
    });
  }

  train(inputs) {
    return this.neurone.startTraining(inputs);
  }

  classifyInput(input) {
    return this.neurone.classifyInput(input);
  }

  getLine(weights) {
    return {
      point1: [UPPER_SCALE_DOMAIN, this.neurone.lineFn(UPPER_SCALE_DOMAIN, weights)],
      point2: [LOWER_SCALE_DOMAIN, this.neurone.lineFn(LOWER_SCALE_DOMAIN, weights)],
    };
  }
}

export default new NeuronService();
