const state = () => ({ position: {} })

const mutations = {
  setPosition(state, val) {
    state.position = val
  }
}

const action = {
  setPosition: ({ commit }, position) => {
    commit('setPosition', position)
  }
}

export default { namespaced: true, state, action, mutations }
