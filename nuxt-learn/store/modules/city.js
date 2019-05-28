const state = () => ({
    list: ['a', 'b', 'c']
})

const mutations = {
    add(state, text) {
        state.list.push(text)
    }
}

const actions = {
    add: ({commit}, text) => {
        commit('add', text)
    }
}

export default {
    mamespaced: true,
    state,
    mutations,
    actions
}
