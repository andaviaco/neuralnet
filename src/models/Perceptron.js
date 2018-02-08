import nj from 'numjs';
import { DEFAULT_LEARNING_RATE, DEFAULT_MAX_EPOCH, perceptronStates } from '../const';
import { randomArray } from '../lib';


const WEIGHT_SIZE = 3;
const THRESHOLD_INPUT = -1;

export default class Perceptron {
  constructor(
    learningRate = DEFAULT_LEARNING_RATE,
    maxEpoch = DEFAULT_MAX_EPOCH,
    {
      upperBound = 10,
      lowerBound = -10,
    },
  ) {
    this.learningRate = learningRate;
    this.maxEpoch = maxEpoch;
    this.weights = randomArray(WEIGHT_SIZE, lowerBound, upperBound);
    this.status = perceptronStates.UNTRAINED;
    this.epoch = 0;
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
  }

  get w() {
    return nj.array(this.weights);
  }

  set w(weights) {
    this.weights = weights.tolist();
  }

  async startTraining(inputs) {
    let trainingResults = [];
    let isTrained = false;

    this.epoch = 0;
    this.status = perceptronStates.TRAINING;

    for (const epoch of nj.arange(1, this.maxEpoch + 1).tolist()) {
      this.epoch = epoch;

      trainingResults = inputs.map(this.train.bind(this));

      if (trainingResults.every(i => i === true)) {
        isTrained = true;
        break;
      }
    }

    if (isTrained) {
      this.status = perceptronStates.TRAINED;
      console.log('Trained W', this.weights);
    } else {
      this.status = perceptronStates.UNTRAINED;
    }

    return isTrained;
  }

  train([input, expected]) {
    let trainingResult = true;

    const pw = this.classifyInput(input);
    const error = expected - pw;

    if (error !== 0) {
      this.w = this.getWeightUpdate(input, error);

      trainingResult = false;
    }

    return trainingResult;
  }

  classifyInput(input) {
    const x = Perceptron.formatInput(input);
    const sum = nj.dot(this.w.T, x).sum();

    if (sum >= 0) {
      return 1;
    }

    return 0;
  }

  getWeightUpdate(input, error) {
    const x = Perceptron.formatInput(input);

    return this.w.add(x.multiply(error).multiply(this.learningRate));
  }

  lineFn(x) {
    const [w0, w1, w2] = this.weights;

    return ((-w1 * x) + w0) / w2;
  }

  static formatInput(input) {
    return nj.array([THRESHOLD_INPUT, ...input]);
  }
}
