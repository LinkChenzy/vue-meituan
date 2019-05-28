const state = () => ({
    app: []
})

const mutations = {
    add(state, text) {
        state.app.push(text)
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
