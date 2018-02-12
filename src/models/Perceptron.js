import Neurone from './Neurone';

export default class Perceptron extends Neurone {
  train([input, expected]) {
    let trainingResult = true;

    const activationValue = this.classifyInput(input);
    const error = Perceptron.calcError(expected, activationValue);

    if (error !== 0) {
      this.w = this.getWeightUpdate(input, error);

      trainingResult = false;
    }

    return trainingResult;
  }

  getWeightUpdate(input, error) {
    const x = Neurone.formatInput(input);

    return this.w.add(x.multiply(error).multiply(this.learningRate));
  }

  classifyInput(input) {
    const activationValue = this.activation(input);

    return Neurone.outputFn(activationValue);
  }

  static calcError(expected, activationValue) {
    return expected - activationValue;
  }
}
