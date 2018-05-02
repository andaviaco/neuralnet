import nj from 'numjs';
import { range } from '@/lib';
import OutputNeurone from './OutputNeurone';

class OutputLayer {
  neurones = [];
  inputs = [];
  msError = 1;
  isTrained = false;

  constructor(numNeurones, numInputs) {
    this.neurones = Array(numNeurones)
      .fill()
      .map(() => new OutputNeurone(numInputs));
  }

  static calculateError(output, expected) {
    const outputArray = nj.array(output);
    const expectedArray = nj.array(expected);

    return expectedArray.subtract(outputArray).tolist();
  }

  feedForward(input) {
    return this.neurones.map(n => n.activate(input));
  }

  train(trainingSet, learningRate, maxEpoch, desiredError) {
    let epochError = 0;
    let trainingResults = [];

    this.desiredError = desiredError;
    this.learningRate = learningRate;

    for (const epoch of range(1, maxEpoch + 1)) {
      this.epoch = epoch;

      trainingResults = trainingSet.map(this.trainingCycle.bind(this));
      epochError = trainingResults.reduce((acc, { error }) => acc + error, 0);

      this.msError = epochError / trainingResults.length;

      if (this.stopCondition()) {
        this.isTrained = true;
        break;
      }
    }

    return this.isTrained;
  }

  trainingCycle([input, expected]) {
    let error = 0;
    let squareError = 0;
    let output = 0;

    output = this.feedForward(input);
    error = OutputLayer.calculateError(output, expected);
    squareError = nj.array(error).pow(2).sum() / 2;

    this.updateWeights(input, error);

    return { error: squareError };
  }

  updateWeights(input, error) {
    const delta = this.weightDelta(input, error);

    this.neurones.forEach((n, i) => n.updateWeights(delta.slice([i, i + 1])));
  }

  weightDelta(input, error) {
    const paddedInput = [OutputNeurone.THRESHOLD_INPUT, ...input];
    const e = nj.array(error).reshape([error.length, 1]);
    const h = nj.array(paddedInput).reshape([1, paddedInput.length]);

    return e.dot(h).multiply(this.learningRate);
  }

  stopCondition() {
    return this.msError <= this.desiredError;
  }
}

export default OutputLayer;
