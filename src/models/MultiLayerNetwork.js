import nj from 'numjs';

import { randomArray, range, sigmoid } from '../lib';


const THRESHOLD_INPUT = -1;

class Neurone {
  weights = [];
  output = [];

  constructor(size) {
    this.weights = randomArray(size + 1, 0, 1);
  }

  get w() {
    return nj.array(this.weights);
  }

  static formatInput(input) {
    return nj.array([THRESHOLD_INPUT, ...input]);
  }

  process(input) {
    const activationValue = this.activation(input);

    this.output = this.transference(activationValue);

    return this.output;
  }

  activation(input) {
    const x = Neurone.formatInput(input);
    const sum = nj.dot(this.w, x).tolist()[0];

    return sum;
  }

  transference(value) {
    return sigmoid(value);
  }
}

class Layer {
  neurones = [];
  input = [];
  output = [];

  constructor(numInputs, numNeurones) {
    this.neurones = Array(numNeurones)
      .fill()
      .map(() => new Neurone(numInputs));
  }

  get weights() {
    return [];
  }

  get sesibility() {
    return [];
  }

  feedForward(input) {
    this.input = input;
    this.output = this.neurones.map(n => n.process(input));
  }

  updateWeights() {

  }

  updateSensibility() {

  }
}

class MultiLayerNetwork {
  hiddenLayers = [];
  outputLayer = null;
  msError = 1;
  isTrained = false;

  constructor(numInputs, numClasses, numHiddenLayers, numNeurones) {
    this.hiddenLayers = Array(numHiddenLayers)
      .fill()
      .map(() => new Layer(numInputs, numNeurones));

    /*
     * the number of inputs in the output layer is the same as the number
     * of neurones in the last hidden layer
     */
    this.outputLayer = new Layer(numNeurones, numClasses);
  }

  train(trainingSet, learningRate, maxEpoch, desiredError) {
    let epochError = 0;
    let trainingResults = [];

    this.desiredError = desiredError;

    for (const epoch of range(1, maxEpoch + 1)) {
      console.log('EPOCH', epoch);
      trainingResults = trainingSet.map(this.trainingCycle.bind(this));
      epochError = trainingResults.reduce((acc, { error }) => acc + error, 0);

      this.msError = epochError / trainingResults.length;
      console.log('MSE', this.msError);

      if (this.stopCondition()) {
        this.isTrained = true;
        console.log('TRAINED');
        break;
      }
    }
  }

  trainingCycle([input, expected]) {
    let error = 0;
    let squareError = 0;
    this.forwardPropagate(input);

    error = this.calculateError(expected);
    squareError = nj.array(error).pow(2).sum();
    console.log('squareError', squareError);
    this.backwardPropagate(error);

    return { error: squareError };
  }

  forwardPropagate(input) {
    const allLayers = this.hiddenLayers.concat([this.outputLayer]);
    let prevLayer = allLayers[0];

    prevLayer.output = input;

    for (const layer of allLayers.slice(1)) {
      const nextInput = prevLayer.output;

      layer.feedForward(nextInput);
      prevLayer = layer;
    }
  }

  backwardPropagate(error) {

  }

  calculateError(expected) {
    const output = nj.array(this.outputLayer.output);

    return nj.array(expected).subtract(output).tolist();
  }

  stopCondition() {
    return this.msError <= this.desiredError;
  }
}

export default MultiLayerNetwork;
