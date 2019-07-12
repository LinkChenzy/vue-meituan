const state = () => ({ menu: [], hotPlace: [] })

const mutations = {
  setMenu(state, val) {
    state.menu = val
  },
  sethotPlace(state, val) {
    state.hotPlace = val
  }
}

const actions = {
  setMenu: ({ commit }, menu) => {
    commit('setMenu', menu)
  },
  sethotPlace: ({ commit }, hotPlace) => {
    commit('sethotPlace', hotPlace)
  }
}

export default { namespaced: true, state, actions, mutations }
