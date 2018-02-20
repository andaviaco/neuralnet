import { NeuronService } from '../services';
import {
  ADD_LINE,
  ADD_POINT,
  UPDATE_NEURON_STATUS,
  UPDATE_NEURON_EPOCH,
} from './mutation-types';


export default {
  drawPerceptronLine({ commit }) {
    const line = NeuronService.getLine();

    commit(ADD_LINE, line);
  },

  setPerceptron({ dispatch }, { learningRate, maxEpoch }) {
    NeuronService.setPerceptron(learningRate, maxEpoch);

    dispatch('drawPerceptronLine');
  },

  setAdaline({ dispatch }, { learningRate, maxEpoch, desiredError }) {
    NeuronService.setAdaline(learningRate, maxEpoch, desiredError);

    dispatch('drawPerceptronLine');
  },

  async trainPerceptron({ commit, dispatch }, { inputs }) {
    const result = await NeuronService.train(inputs);

    commit(UPDATE_NEURON_STATUS, { status: NeuronService.status });
    commit(UPDATE_NEURON_EPOCH, { epoch: NeuronService.epoch });

    dispatch('drawPerceptronLine');

    return result;
  },

  async trainAdaline({ commit, dispatch }, { inputs }) {
    const result = await NeuronService.train(inputs, ({ epoch, mse }) => {
      console.log('MSE', mse);
      console.log('EPOCH', epoch);
    });

    commit(UPDATE_NEURON_STATUS, { status: NeuronService.status });
    commit(UPDATE_NEURON_EPOCH, { epoch: NeuronService.epoch });

    dispatch('drawPerceptronLine');

    return result;
  },

  addUnclassifiedPoint({ commit }, { x, y }) {
    const classification = NeuronService.classifyInput([x, y]);

    commit(ADD_POINT, { x, y, type: classification });
  },
};
