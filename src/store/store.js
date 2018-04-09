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
  CLASS_DISCRETE_MAP,
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
    mlnHiddenLayers: 1,
    mlnLayerNeurones: 3,
    classifiedArea: [],
  },
  getters: {
    pointAsArrays(state) {
      return state.points.map(p => [[p.x, p.y], p.type]);
    },
    discretePointAsArrays(state) {
      return state.points.map(p => [[p.x, p.y], CLASS_DISCRETE_MAP[p.type]]);
    },
  },
  mutations: {
    /* eslint-disable no-param-reassign  */
    /* eslint-disable import/no-named-as-default-member  */

    [types.UPDATE_SELECTED_TOOL](state, { tool }) {
      state.selectedTool = tool;
    },
    [types.UPDATE_LEARNING_RATE](state, value) {
      state.learningRate = value;
    },
    [types.UPDATE_MAX_EPOCH](state, value) {
      state.maxEpoch = value;
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
    [types.UPDATE_NEURON_EPOCH](state, value) {
      state.neuronEpoch = value;
    },
    [types.UPDATE_DESIRED_ERROR](state, value) {
      state.desiredError = value;
    },
    [types.UPDATE_MLN_HIDDEN_LAYERS](state, value) {
      state.mlnHiddenLayers = value;
    },
    [types.UPDATE_MLN_LAYER_NEURONES](state, value) {
      console.log('layerNeurones', value);
      state.mlnLayerNeurones = value;
    },
    [types.UPDATE_CLASSIFIED_AREA](state, value) {
      state.classifiedArea = value;
    },
    [types.ADD_CLASSIFIED_AREA_POINT](state, { x, y, type }) {
      state.classifiedArea = [...state.classifiedArea, { x, y, type }];
    },
    [types.ACTIVATE_LOADING](state) {
      state.loading = true;
    },
    [types.DEACTIVATE_LOADING](state) {
      state.loading = false;
    },
    [types.CLEAR_TRAINING](state) {
      state.lines = [];
      state.classifiedArea = [];
    },
  },

  actions,
});
