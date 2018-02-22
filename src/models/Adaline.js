import Neurone from './Neurone';
import { range, sigmoid } from '../lib';

export default class Adaline extends Neurone {
  constructor(desiredError, ...args) {
    super(...args);

    this.meanSquareError = 1;
    this.desiredError = desiredError;
    this.isTrained = false;
  }

  async startTraining(inputs) {
    let trainingResults = [];
    let epochError = 0;

    this.isTrained = false;
    this.epoch = 0;
    this.status = Neurone.states.TRAINING;

    for (const epoch of range(1, this.maxEpoch + 1)) {
      this.epoch = epoch;

      trainingResults = inputs.map(this.train.bind(this));
      epochError = trainingResults.reduce((acc, { error }) => (acc + (error ** 2)), 0);

      this.meanSquareError = epochError / inputs.length;

      if (this.stopCondition()) {
        this.isTrained = true;
        break;
      }

      this.logProgress({ epoch: this.epoch, error: this.meanSquareError });
    }

    if (this.isTrained) {
      this.status = Neurone.states.TRAINED;
      console.log('Trained W', this.weights);
    } else {
      this.status = Neurone.states.UNTRAINED;
    }

    return { isTrained: this.isTrained, progressLog: this.progressLog };
  }

  train([input, expected]) {
    const activationValue = this.activation(input);
    const error = Adaline.calcError(expected, activationValue);

    this.w = this.getWeightUpdate(activationValue, input, error);

    return { error };
  }

  getWeightUpdate(activationValue, input, error) {
    const x = Neurone.formatInput(input);
    const sigmoidActivation = sigmoid(activationValue);
    const sigmoidProduct = sigmoidActivation * (1 - sigmoidActivation);
    const product = this.learningRate * error * sigmoidProduct;
    const weightUpdate = this.w.add(x.multiply(product));

    return weightUpdate;
  }

  classifyInput(input) {
    const activationValue = this.activation(input);

    return Neurone.outputFn(activationValue);
  }

  stopCondition() {
    return this.meanSquareError <= this.desiredError;
  }

  static calcError(expected, activationValue) {
    return expected - sigmoid(activationValue);
  }
}
