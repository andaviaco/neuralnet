import PerceptronService from '../PerceptronService';
import {
  ADD_LINE,
  ADD_POINT,
  UPDATE_PERCEPTRON_STATUS,
  UPDATE_PERCEPTRON_EPOCH,
} from './mutation-types';


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
    const result = await PerceptronService.trainPerceptron(inputs);

    commit(UPDATE_PERCEPTRON_STATUS, { status: PerceptronService.status });
    commit(UPDATE_PERCEPTRON_EPOCH, { epoch: PerceptronService.epoch });

    dispatch('drawPerceptronLine');

    return result;
  },

  addUnclassifiedPoint({ commit }, { x, y }) {
    const classification = PerceptronService.classifyInput([x, y]);

    commit(ADD_POINT, { x, y, type: classification });
  },
};
