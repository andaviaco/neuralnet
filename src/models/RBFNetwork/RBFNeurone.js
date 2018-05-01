import nj from 'numjs';

import { randomArray, gaussian } from '@/lib';

class RBFNeurone {
  constructor(size) {
    this.spread = 0;
    this.patterns = [];
    this.center = randomArray(size, -5, 5);
  }

  activate(input) {
    return gaussian(input, this.center, this.spread);
  }

  clearPatterns() {
    this.patterns = [];
  }

  addPattern(pattern) {
    this.patterns.push(pattern);
  }

  setPatterns(patterns) {
    this.patterns = patterns;
  }

  updateCenter() {
    if (this.patterns.length) {
      const patternShape = this.patterns[0].length;

      const patternSum = this.patterns.reduce((acc, p) => (
        acc.add(nj.array(p))
      ), nj.zeros([patternShape]));

      this.center = patternSum.divide(this.patterns.length).tolist();
    }
  }

  setSpread(spread) {
    this.spread = spread;
  }
}

export default RBFNeurone;
