import { zip } from '@/lib';
import RBFLayer from './RBFLayer';
import OutputLayer from './OutputLayer';


class RBFNetwork {
  hiddenLayer = null;
  outputLayer = null;
  kNearest = 2

  constructor(numInputs, numHiddenNeurons, numOutputNeurones) {
    this.hiddenLayer = new RBFLayer(numHiddenNeurons, numInputs);
    this.outputLayer = new OutputLayer(numOutputNeurones, numHiddenNeurons);
  }

  get epoch() {
    return this.outputLayer.epoch;
  }

  get formatedStatus() {
    return this.outputLayer.state;
  }

  startTraining(trainingSet, learningRate, maxEpoch, desiredError) {
    const patterns = trainingSet.map(tset => tset[0]);
    const expected = trainingSet.map(tset => tset[1]);

    this.hiddenLayer.clustering(patterns);

    const hiddenLayerOutput = this.feedHiddenLayer(patterns);
    const outputTrainingSet = zip(hiddenLayerOutput, expected);

    return this.outputLayer.train(outputTrainingSet, learningRate, maxEpoch, desiredError);
  }

  feedHiddenLayer(patterns) {
    return patterns.map(p => this.hiddenLayer.feedForward(p));
  }

  classifyInput(input) {
    const hiddenLayerOutput = this.hiddenLayer.feedForward(input);
    const output = this.outputLayer.feedForward(hiddenLayerOutput);

    return output;
  }
}

export default RBFNetwork;
