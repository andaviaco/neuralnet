import nj from 'numjs';
import EventEmitter from 'events';

import { range } from '@/lib';
import {
  NEURON_STATUS_UNTRAINED,
  NEURON_STATUS_TRAINING,
  NEURON_STATUS_TRAINED,
} from '@/const';

import Layer from './Layer';

class MultiLayerNetwork extends EventEmitter {
  hiddenLayers = [];
  outputLayer = null;
  msError = 1;
  epoch = 0;
  isTrained = false;
  state = NEURON_STATUS_UNTRAINED;

  constructor(numInputs, numClasses, numHiddenLayers, numNeurones) {
    super();

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

  get formatedStatus() {
    return this.state;
  }

  async startTraining(trainingSet, learningRate, maxEpoch, desiredError) {
    let epochError = 0;
    let trainingResults = [];

    this.desiredError = desiredError;
    this.learningRate = learningRate;
    this.state = NEURON_STATUS_TRAINING;

    for (const epoch of range(1, maxEpoch + 1)) {
      this.epoch = epoch;
      trainingResults = trainingSet.map(this.trainingCycle.bind(this));
      epochError = trainingResults.reduce((acc, { error }) => acc + error, 0);

      this.msError = epochError / trainingResults.length;

      if (this.stopCondition()) {
        this.isTrained = true;
        break;
      }

      this.logProgress({ epoch, error: this.msError });
    }

    if (this.isTrained) {
      this.state = NEURON_STATUS_TRAINED;
    } else {
      this.state = NEURON_STATUS_UNTRAINED;
    }

    this.logProgress({ epoch: this.epoch, error: this.msError });

    return this.isTrained;
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

  classifyInput(input) {
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

  logProgress({ epoch, error }) {
    this.emit('trainingProgress', {
      epoch,
      error,
      status: this.formatedStatus,
    });
  }
}

export default MultiLayerNetwork;
