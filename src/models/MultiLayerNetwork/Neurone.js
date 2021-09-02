import nj from 'numjs';

import { randomArray, sigmoid } from '@/lib';

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

  /* eslint-disable class-methods-use-this */
  transference(value) {
    return sigmoid(value);
  }

  updateWeights(delta) {
    const d = nj.array(delta.tolist()[0]);
    this.w = this.w.add(d);
  }
}

export default Neurone;
