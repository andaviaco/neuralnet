import nj from 'numjs';
import math from 'mathjs';

import { euclideanDistanceNorm, minBy, range } from '@/lib';
import RBFNeurone from './RBFNeurone';

class RBFLayer {
  constructor(numNeurones, numInputs) {
    this.kNearest = 2;
    this.neurones = Array(numNeurones)
      .fill()
      .map(() => new RBFNeurone(numInputs));
  }

  static nearestCluster(pattern, neurones) {
    const distances = neurones.map((n, i) => (
      [i, euclideanDistanceNorm(pattern, n.center)]
    ));
    const [nearestIndex] = minBy(distances, d => d[1]);

    return nearestIndex;
  }

  feedForward(input) {
    return this.neurones.map(n => n.activate(input));
  }

  clustering(patterns) {
    this.kMeansClustering(patterns);
    this.updateSpreads();
  }

  kMeansClustering(patterns) {
    let reassignations;
    let assignedPatterns = patterns.map(p => (
      [p, RBFLayer.nearestCluster(p, this.neurones)]
    ));

    this.updateCenters(assignedPatterns);

    while (reassignations !== 0) {
      reassignations = 0;

      // eslint-disable-next-line no-loop-func
      assignedPatterns = assignedPatterns.map(([p, nearest]) => {
        const newNearest = RBFLayer.nearestCluster(p, this.neurones);

        if (newNearest !== nearest) {
          reassignations += 1;
        }

        return [p, newNearest];
      });

      if (reassignations) this.updateCenters(assignedPatterns);
    }
  }

  updateCenters(assignedPatterns) {
    const assigments = assignedPatterns.reduce((acc, [p, i]) => ({
      ...acc,
      [i]: acc[i] ? [...acc[i], p] : [p],
    }), {});

    Object.keys(assigments).forEach((i) => {
      this.neurones[i].setPatterns(assigments[i]);
      this.neurones[i].updateCenter();
    });
  }

  updateSpreads() {
    this.neurones.forEach((n, i) => n.setSpread(this.neuronSpread(n, i)));
  }

  neuronSpread(neurone, index) {
    const neurones = [...this.neurones];
    let total = 0;
    let kCount = 0;

    neurones.splice(index, 1);

    for (kCount of range(1, this.kNearest + 1)) {
      const nearestIndex = RBFLayer.nearestCluster(neurone.center, neurones);
      const [kNearest] = neurones.splice(nearestIndex, 1);
      const ncenter = nj.array(neurone.center);
      const kcenter = nj.array(kNearest.center);

      total += math.norm(ncenter.subtract(kcenter).tolist());


      if (!neurones.length) break;
    }

    return total / kCount;
  }
}

export default RBFLayer;
