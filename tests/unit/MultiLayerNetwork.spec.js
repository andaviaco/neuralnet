import MultiLayerNetwork from '@/models/MultiLayerNetwork.js';

describe('MultiLayerNetwork', () => {
  it('can be trained successfully.', () => {
    const mln = new MultiLayerNetwork(2, 1, 1, 3);

    const trainingSet = [
      [[2, 2], 1],
      [[3, 3], 1],
      [[1, 1], 0],
      [[0, 1], 0],
    ];
    const learningRate = 0.1;
    const maxEpoch = 5000;
    const desiredError = 0.01;

    mln.train(trainingSet, learningRate, maxEpoch, desiredError);

    expect(mln.classify([2, 2])).toEqual([1]);
    expect(mln.classify([3, 3])).toEqual([1]);
    expect(mln.classify([1, 1])).toEqual([0]);
    expect(mln.classify([0, 1])).toEqual([0]);
  })
})
