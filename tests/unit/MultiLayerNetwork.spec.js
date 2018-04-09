import MultiLayerNetwork from '@/models/MultiLayerNetwork/MultiLayerNetwork.js';

describe('MultiLayerNetwork', () => {
  it('can be trained for two classes.', () => {
    const mln = new MultiLayerNetwork(2, 1, 1, 3);

    const trainingSet = [
      [[2, 2], [1]],
      [[3, 3], [1]],
      [[1, 1], [0]],
      [[0, 1], [0]],
    ];
    const learningRate = 0.1;
    const maxEpoch = 5000;
    const desiredError = 0.01;

    mln.startTraining(trainingSet, learningRate, maxEpoch, desiredError);

    expect(mln.classifyInput([2, 2])).toEqual([1]);
    expect(mln.classifyInput([3, 3])).toEqual([1]);
    expect(mln.classifyInput([1, 1])).toEqual([0]);
    expect(mln.classifyInput([0, 1])).toEqual([0]);
  });

  it('can be trained for three classes.', () => {
    const mln = new MultiLayerNetwork(2, 2, 1, 3);

    const trainingSet = [
      [[2, 2], [0, 0]],
      [[3, 3], [0, 0]],
      [[-2, 2], [0, 1]],
      [[-3, 3], [0, 1]],
      [[0, -2], [1, 0]],
      [[0, -3], [1, 0]],
    ];
    const learningRate = 0.1;
    const maxEpoch = 5000;
    const desiredError = 0.01;

    mln.startTraining(trainingSet, learningRate, maxEpoch, desiredError);

    expect(mln.classifyInput([2, 2])).toEqual([0, 0]);
    expect(mln.classifyInput([3, 3])).toEqual([0, 0]);
    expect(mln.classifyInput([-2, 2])).toEqual([0, 1]);
    expect(mln.classifyInput([-3, 3])).toEqual([0, 1]);
    expect(mln.classifyInput([0, -2])).toEqual([1, 0]);
    expect(mln.classifyInput([0, -3])).toEqual([1, 0]);
  })
});
