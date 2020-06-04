import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters.js';
import state from './states.js';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        mutations,
        getters,
        state
    },
    actions
})