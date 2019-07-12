import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: { geo, home },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        // 城市的数据Vuex
        const {
          status,
          data: { province, city }
        } = await app.$axios.get('/geo/getPosition')
        commit(
          'geo/setPosition',
          status === 200 ? { city, province } : { city: '', province: '' }
        )
        // 菜单的数据Vuex
        const {
          status: statusMenu,
          data: { menu }
        } = await app.$axios.get('/geo/menu')
        commit('home/setMenu', statusMenu === 200 ? menu : [])
        // 热门搜索的Vuex
        const {
          status: statushot,
          data: { hotPlace }
        } = await app.$axios.get('/search/hotPlace', {
          params: {
            city: app.store.state.geo.position.city.replace('市', '')
          }
        })
        // console.log(hotPlace)
        commit('home/sethotPlace', statushot === 200 ? hotPlace : [])
      }
    }
  })

export default store
