import nj from 'numjs';
import { DEFAULT_LEARNING_RATE, DEFAULT_MAX_EPOCH, perceptronStates } from '../const';

function randomNumberInRange(min, max) {
  return Math.random() * ((max - min) + min);
}

export default class Perceptron {
  constructor(learningRate = DEFAULT_LEARNING_RATE, maxEpoch = DEFAULT_MAX_EPOCH) {
    this.learningRate = learningRate;
    this.maxEpoch = maxEpoch;
    this.weights = Array.from({ length: 3 }).map(() => randomNumberInRange(-10, 10));
    this.status = perceptronStates.UNTRAINED;
  }

  get w() {
    return nj.array(this.weights);
  }

  async startTraining(inputs) {
    let trainingResults = [];
    let isTrained = false;

    this.status = perceptronStates.TRAINING;

    for (const epoch of nj.arange(1, this.maxEpoch + 1).tolist()) {
      trainingResults = inputs.map(this.train.bind(this));

      if (trainingResults.every(i => i === true)) {
        isTrained = true;
        break;
      }

      console.log('epoch', epoch);
    }

    if (isTrained) {
      this.status = perceptronStates.TRAINED;
      console.log('Trained W', this.weights);
      return true;
    }

    return false;
  }

  set w(newW) {
    this.weights = newW.tolist();
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

    // console.log(`f(x)=(-${w1}x + ${w0}) / ${w2}`);
    return ((-w1 * x) + w0) / w2;
  }

  static formatInput(input) {
    return nj.array([-1, ...input]);
  }
}
