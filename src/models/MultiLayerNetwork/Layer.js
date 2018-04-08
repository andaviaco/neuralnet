import nj from 'numjs';

import { dsigmoid } from '@/lib';
import Neurone from './Neurone';

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

export default Layer;
