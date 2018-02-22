import Vue from 'vue';
import Vuex from 'vuex';

import types from './mutation-types';
import actions from './actions';
import {
  DEFAULT_TOOL,
  DEFAULT_MAX_EPOCH,
  DEFAULT_LEARNING_RATE,
  DEFAULT_DESIRED_ERROR,
  NEURON_STATUS_UNTRAINED,
} from '../const';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedTool: DEFAULT_TOOL,
    learningRate: DEFAULT_LEARNING_RATE,
    maxEpoch: DEFAULT_MAX_EPOCH,
    points: [],
    lines: [],
    neuronStatus: NEURON_STATUS_UNTRAINED,
    neuronEpoch: 0,
    desiredError: DEFAULT_DESIRED_ERROR,
    errorLog: [],
    loading: false,
  },
  getters: {
    pointAsArrays(state) {
      return state.points.map(p => [[p.x, p.y], p.type]);
    },
  },
  mutations: {
    /* eslint-disable no-param-reassign  */
    /* eslint-disable import/no-named-as-default-member  */

    [types.UPDATE_SELECTED_TOOL](state, { tool }) {
      state.selectedTool = tool;
    },
    [types.UPDATE_LEARNING_RATE](state, { learningRate }) {
      state.learningRate = learningRate;
    },
    [types.UPDATE_MAX_EPOCH](state, { maxEpoch }) {
      state.maxEpoch = maxEpoch;
    },
    [types.ADD_POINT](state, { x, y, type }) {
      state.points = [...state.points, { x, y, type }];
    },
    [types.ADD_LINE](state, { point1, point2, type }) {
      state.lines = [...state.lines, { point1, point2, type }];
    },
    [types.ADD_ERROR_LOG](state, { error, epoch }) {
      state.errorLog = [...state.errorLog, { error, epoch }];
    },
    [types.UPDATE_NEURON_STATUS](state, { status }) {
      state.neuronStatus = status;
    },
    [types.UPDATE_NEURON_EPOCH](state, { epoch }) {
      state.neuronEpoch = epoch;
    },
    [types.UPDATE_DESIRED_ERROR](state, { error }) {
      state.desiredError = error;
    },
    [types.ACTIVATE_LOADING](state) {
      state.loading = true;
    },
    [types.DEACTIVATE_LOADING](state) {
      state.loading = false;
    },
  },

  actions,
});
