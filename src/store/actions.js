import { NeuronService } from '../services';
import { delay } from '../lib';
import {
  ADD_LINE,
  ADD_POINT,
  ADD_ERROR_LOG,
  UPDATE_NEURON_STATUS,
  UPDATE_NEURON_EPOCH,
  ACTIVATE_LOADING,
  DEACTIVATE_LOADING,
  ADD_CLASSIFIED_AREA_POINT,
} from './mutation-types';
import { DRAWING_SPEED } from '../const';


export default {
  drawNeuronLine({ commit }, { type, weights }) {
    const line = NeuronService.getLine(weights);

    commit(ADD_LINE, { ...line, type });
  },

  setPerceptron({ dispatch }, { learningRate, maxEpoch }) {
    NeuronService.setPerceptron(learningRate, maxEpoch);

    dispatch('drawNeuronLine', { type: NeuronService.status });
  },

  setAdaline({ dispatch }, { learningRate, maxEpoch, desiredError }) {
    NeuronService.setAdaline(learningRate, maxEpoch, desiredError);

    dispatch('drawNeuronLine', { type: NeuronService.status });
  },

  setMLN(_, { hiddenLayers, layerNeurones }) {
    NeuronService.setMLN(hiddenLayers, layerNeurones);
  },

  async trainPerceptron({ commit, dispatch }, { inputs }) {
    const result = await NeuronService.train(inputs);

    commit(UPDATE_NEURON_STATUS, { status: NeuronService.status });
    commit(UPDATE_NEURON_EPOCH, NeuronService.epoch);

    dispatch('drawNeuronLine', { type: NeuronService.status });

    return result;
  },

  async trainAdaline({ commit, dispatch }, { inputs }) {
    const result = await NeuronService.train(inputs);

    for (const log of result.progressLog) {
      const {
        error,
        status,
        epoch,
        weights,
      } = log;

      dispatch('drawNeuronLine', { type: status, weights });
      commit(ADD_ERROR_LOG, { error, epoch });
      commit(UPDATE_NEURON_EPOCH, epoch);

      // eslint-disable-next-line no-await-in-loop
      await delay(DRAWING_SPEED);
    }

    commit(UPDATE_NEURON_STATUS, { status: NeuronService.status });
    dispatch('drawNeuronLine', { type: NeuronService.status });

    return result.isTrained;
  },

  async trainMLN({ commit }, setup) {
    commit(ACTIVATE_LOADING);

    const result = await NeuronService.train(
      setup.inputs,
      setup.learningRate,
      setup.maxEpoch,
      setup.desiredError,
    );

    commit(UPDATE_NEURON_STATUS, { status: NeuronService.status });
    commit(UPDATE_NEURON_EPOCH, NeuronService.epoch);
    commit(DEACTIVATE_LOADING);

    return result;
  },

  addUnclassifiedPoint({ commit }, { x, y }) {
    const classification = NeuronService.classifyInput([x, y]);

    commit(ADD_POINT, { x, y, type: classification });
  },

  classifyPoint(_, { x, y }) {
    const classification = NeuronService.classifyInput([x, y]);

    return classification;
  },

  async fillClassifiedArea({ commit, dispatch }, points) {
    commit(ACTIVATE_LOADING);

    await Promise.all(points.map(async ([x, y]) => {
      const pointClass = await dispatch('classifyPoint', { x, y });

      commit(ADD_CLASSIFIED_AREA_POINT, { x, y, type: pointClass });
    }));

    commit(DEACTIVATE_LOADING);
  },
};
