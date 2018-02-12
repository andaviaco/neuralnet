import nj from 'numjs';
import {
  DEFAULT_LEARNING_RATE,
  DEFAULT_MAX_EPOCH,
  neuronStates,
} from '../const';
import { randomArray } from '../lib';


const WEIGHT_SIZE = 3;
const THRESHOLD_INPUT = -1;

export default class Neurone {
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
    this.status = neuronStates.UNTRAINED;
    this.epoch = 0;
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
    this.isTrained = false;
  }

  static get states() {
    return neuronStates;
  }

  get w() {
    return nj.array(this.weights);
  }

  set w(weights) {
    this.weights = weights.tolist();
  }

  async startTraining(inputs) {
    let trainingResults = [];

    this.isTrained = false;
    this.epoch = 0;
    this.status = neuronStates.TRAINING;

    for (const epoch of nj.arange(1, this.maxEpoch + 1).tolist()) {
      this.epoch = epoch;

      trainingResults = inputs.map(this.train.bind(this));

      this.isTrained = trainingResults.every(i => i === true);

      if (this.stopCondition()) {
        break;
      }
    }

    if (this.isTrained) {
      this.status = neuronStates.TRAINED;
      console.log('Trained W', this.weights);
    } else {
      this.status = neuronStates.UNTRAINED;
    }

    return this.isTrained;
  }

  classifyInput(input) {
    const activationValue = this.activation(input);

    return Neurone.outputFn(activationValue);
  }

  activation(input) {
    const x = Neurone.formatInput(input);
    const sum = nj.dot(this.w.T, x).sum();

    return sum;
  }

  lineFn(x) {
    const [w0, w1, w2] = this.weights;

    return ((-w1 * x) + w0) / w2;
  }

  stopCondition() {
    return this.isTrained;
  }

  static outputFn(activationValue) {
    if (activationValue >= 0) {
      return 1;
    }

    return 0;
  }

  static formatInput(input) {
    return nj.array([THRESHOLD_INPUT, ...input]);
  }
}