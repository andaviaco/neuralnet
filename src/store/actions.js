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
  ADD_INTERPOLATION_LINE_POINT,
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

  setRBF(_, { rbfLayerNeurones }) {
    NeuronService.setRBF(rbfLayerNeurones);
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

  async trainMLN({ commit, dispatch }, setup) {
    commit(ACTIVATE_LOADING);

    const result = await NeuronService.train(
      setup.inputs,
      setup.learningRate,
      setup.maxEpoch,
      setup.desiredError,
    );

    for (const log of NeuronService.progressLog) {
      // eslint-disable-next-line no-await-in-loop
      await dispatch('updateTrainingProgress', log);
    }

    commit(UPDATE_NEURON_STATUS, { status: NeuronService.status });
    commit(UPDATE_NEURON_EPOCH, NeuronService.epoch);
    commit(DEACTIVATE_LOADING);

    return result;
  },

  async trainRBF({ commit }, setup) {
    commit(ACTIVATE_LOADING);

    const result = await NeuronService.train(
      setup.inputs,
      setup.learningRate,
      setup.maxEpoch,
      setup.desiredError,
    );

    // for (const log of NeuronService.progressLog) {
    //   // eslint-disable-next-line no-await-in-loop
    //   await dispatch('updateTrainingProgress', log);
    // }

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
    for (const [x, y] of points) {
      // eslint-disable-next-line no-await-in-loop
      const pointClass = await dispatch('classifyPoint', { x, y });

      commit(ADD_CLASSIFIED_AREA_POINT, { x, y, type: pointClass });

      // eslint-disable-next-line no-await-in-loop
      await delay(0);
    }
  },

  async drawPredictionCurve({ commit }, samples) {
    for (const x of samples) {
      // eslint-disable-next-line no-await-in-loop
      const [y] = NeuronService.classifyInput([x]);

      commit(ADD_INTERPOLATION_LINE_POINT, { x, y });

      // eslint-disable-next-line no-await-in-loop
      await delay(0);
    }
  },

  async updateTrainingProgress({ commit }, { error, epoch }) {
    commit(ADD_ERROR_LOG, { error, epoch });
    commit(UPDATE_NEURON_EPOCH, epoch);

    await delay(DRAWING_SPEED);
  },
};
