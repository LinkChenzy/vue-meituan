import Vue from 'vue'
// import App from './App.vue'
import VueRouter from 'vue-router';
import A from './pages/a';
import B from './pages/b';
import store from './store';

Vue.config.productionTip = false

Vue.use(VueRouter)


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', component: A },
  { path: '/bar', component: B }
]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// const app = new Vue({
//   router
// }).$mount('#app')
new Vue({
//   render: h => h(App),
  router,store
}).$mount('#app')
