import Vue from 'vue';
import Vuex from 'vuex';

import types from './mutation-types';
import { DEFAULT_TOOL } from '../const';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedTool: DEFAULT_TOOL,
  },
  mutations: {
    /* eslint-disable no-param-reassign  */
    /* eslint-disable import/no-named-as-default-member  */

    [types.UPDATE_SELECTED_TOOL](state, payload) {
      state.selectedTool = payload.tool;
    },
  },
  actions: {

  },
});
