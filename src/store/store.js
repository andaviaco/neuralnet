import Vue from 'vue';
import Vuex from 'vuex';

import types from './mutation-types';
import {
  DEFAULT_TOOL,
  DEFAULT_MAX_EPOCH,
  DEFAULT_LEARNING_RATE,
} from '../const';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedTool: DEFAULT_TOOL,
    learningRate: DEFAULT_LEARNING_RATE,
    maxEpoch: DEFAULT_MAX_EPOCH,
  },
  mutations: {
    /* eslint-disable no-param-reassign  */
    /* eslint-disable import/no-named-as-default-member  */

    [types.UPDATE_SELECTED_TOOL](state, payload) {
      state.selectedTool = payload.tool;
    },
    [types.UPDATE_LEARNING_RATE](state, payload) {
      state.learningRate = payload.learningRate;
    },
    [types.UPDATE_MAX_EPOCH](state, payload) {
      state.maxEpoch = payload.maxEpoch;
    },
  },
  actions: {

  },
});
