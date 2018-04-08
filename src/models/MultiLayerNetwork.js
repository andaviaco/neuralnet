import nj from 'numjs';

import { randomArray, range, sigmoid, dsigmoid } from '../lib';


const THRESHOLD_INPUT = -1;

class Neurone {
  weights = [];
  output = [];

  constructor(size) {
    this.weights = randomArray(size + 1, 0, 1);
  }

  static formatInput(input) {
    return nj.array([THRESHOLD_INPUT, ...input]);
  }

  static outputStep(value) {
    if (value >= 0) {
      return 1;
    }

    return 0;
  }

  get w() {
    return nj.array(this.weights);
  }

  set w(value) {
    this.weights = value.tolist();
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

  updateWeights(delta) {
    const d = nj.array(delta.tolist()[0]);
    this.w = this.w.add(d);
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

  get arrayOutput() {
    return nj.array(this.output);
  }

  get arrayInput() {
    return Neurone.formatInput(this.input);
  }

  get weights() {
    return this.neurones.map(n => n.weights.slice(1));
  }

  get nets() {
    return this.neurones.map(n => n.activation(this.input));
  }

  get classifiedOutput() {
    return this.nets.map(Neurone.outputStep);
  }

  feedForward(input) {
    this.input = input;
    this.output = this.neurones.map(n => n.process(input));
  }

  updateWeights(learningRate) {
    const rowInput = this.arrayInput.reshape(1, this.arrayInput.size);
    const deltaWeight = this.sensibility.dot(rowInput).multiply(learningRate);
    this.neurones.map((n, i) => n.updateWeights(deltaWeight.slice([i, i + 1])));
  }

  updateSensibility(nextWeights, nextSensibility) {
    const s = nj.array(nextSensibility);
    const w = nj.array(nextWeights);
    const derivative = nj.array(this.nets.map(dsigmoid));
    const diagDerivate = nj.diag(derivative);

    this.sensibility = diagDerivate.dot(w.T.dot(s));
  }

  outputSensibility(error) {
    const derivative = nj.array(this.nets.map(dsigmoid));
    const sensibility = derivative.multiply(error);

    this.sensibility = sensibility.reshape(sensibility.size, 1);
  }
}

class MultiLayerNetwork {
  hiddenLayers = [];
  outputLayer = null;
  msError = 1;
  isTrained = false;

  constructor(numInputs, numClasses, numHiddenLayers, numNeurones) {
    const inputLayer = new Layer(numInputs, numNeurones);
    const hiddenLayers = Array(numHiddenLayers - 1)
      .fill()
      .map(() => new Layer(numNeurones, numNeurones));

    this.hiddenLayers = [inputLayer, ...hiddenLayers];

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
    this.learningRate = learningRate;

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

    this.backwardPropagate(error);

    return { error: squareError };
  }

  forwardPropagate(input) {
    const allLayers = [...this.hiddenLayers, this.outputLayer];
    let prevLayer = this.hiddenLayers[0];

    prevLayer.feedForward(input);

    allLayers.slice(1).forEach((l) => {
      const nextInput = prevLayer.output;
      l.feedForward(nextInput);
      prevLayer = l;
    });
  }

  backwardPropagate(error) {
    const allLayers = [...this.hiddenLayers, this.outputLayer];
    let prevLayer = this.outputLayer;

    this.outputLayer.outputSensibility(error);

    [...this.hiddenLayers].reverse().forEach((l) => {
      l.updateSensibility(prevLayer.weights, prevLayer.sensibility);
      prevLayer = l;
    });

    allLayers.forEach(l => l.updateWeights(this.learningRate));
  }

  classify(input) {
    this.forwardPropagate(input);

    return this.outputLayer.classifiedOutput;
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
