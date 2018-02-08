import PerceptronService from '../PerceptronService';
import { ADD_LINE, UPDATE_PERCEPTRON_STATUS } from './mutation-types';


export default {
  drawPerceptronLine({ commit }) {
    const line = PerceptronService.getPerceptronLine();

    commit(ADD_LINE, line);
  },

  setPerceptron({ dispatch }, { learningRate, maxEpoch }) {
    PerceptronService.setPerceptron(learningRate, maxEpoch);

    dispatch('drawPerceptronLine');
  },

  async trainPerceptron({ commit, dispatch }, { inputs }) {
    await PerceptronService.trainPerceptron(inputs);

    commit(UPDATE_PERCEPTRON_STATUS, { status: PerceptronService.status });

    dispatch('drawPerceptronLine');
  },
};
