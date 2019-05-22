import Vue from 'vue';
import vuex from 'vuex';

Vue.use(vuex);

const state = {
    count:1
}
const mutations = {
    increment(state){
        state.count++;
    },
    deletion(state){
        state.count--
    }
}
const actions = {
    increment: ({ commit })=>{
        commit('increment')
    },
    deletion: ({commit})=>{
        commit('deletion')
    }
}

export default new vuex.Store({
    state,mutations,actions
})