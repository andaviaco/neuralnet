import nj from 'numjs';

import { randomArray } from '@/lib';

const THRESHOLD_INPUT = -1;

class OutputNeurone {
  weights = [];

  constructor(size) {
    this.weights = randomArray(size + 1, -1, 1);
  }

  static get THRESHOLD_INPUT() {
    return THRESHOLD_INPUT;
  }

  static formatInput(input) {
    return nj.array([THRESHOLD_INPUT, ...input]);
  }

  get w() {
    return nj.array(this.weights);
  }

  set w(value) {
    this.weights = value.tolist();
  }

  activate(input) {
    const x = OutputNeurone.formatInput(input);
    const activation = nj.dot(this.w, x).tolist()[0];

    return activation;
  }

  updateWeights(delta) {
    const d = nj.array(delta.tolist()[0]);
    this.w = this.w.add(d);
  }
}

export default OutputNeurone;
