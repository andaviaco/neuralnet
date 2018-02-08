import Perceptron from './models/Perceptron';
import {
  perceptronStateMap,
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,
} from './const';


class PerceptronService {
  constructor() {
    this.perceptron = null;
  }

  get status() {
    return perceptronStateMap[this.perceptron.status];
  }

  get epoch() {
    return this.perceptron.epoch;
  }

  setPerceptron(learningRate, maxEpoch) {
    this.perceptron = new Perceptron(learningRate, maxEpoch, {
      upperBound: UPPER_SCALE_DOMAIN,
      lowerBound: LOWER_SCALE_DOMAIN,
    });
  }

  trainPerceptron(inputs) {
    return this.perceptron.startTraining(inputs);
  }

  classifyInput(input) {
    return this.perceptron.classifyInput(input);
  }

  getPerceptronLine() {
    return {
      point1: [UPPER_SCALE_DOMAIN, this.perceptron.lineFn(UPPER_SCALE_DOMAIN)],
      point2: [LOWER_SCALE_DOMAIN, this.perceptron.lineFn(LOWER_SCALE_DOMAIN)],
      type: this.status,
    };
  }
}

export default new PerceptronService();
