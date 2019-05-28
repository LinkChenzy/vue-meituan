<template>
  <section class="container">
    <h1 class="title">
      search page
    </h1>
    <ul>
        <!-- vuex ssr -->
        <li v-for="(item , idx) in $store.state.city.list" :key="idx">{{item}}</li>
        <!-- <li v-for="(item , idx) in list" :key="idx">{{item}}</li> -->
    </ul>
  </section>
</template>
<script>
import axios from 'axios'
export default {
    layout: 'search',
    data() {
        return {
            list: []
        }
    },
    // 正常的逻辑渲染，页面会出现数据闪烁
    // async mounted() {
    //     let self = this
    //     let {status, data: {list}} = await axios.get('/city/list')
    //     if (status === 200) {
    //         self.list = list
    //     }
    // }
    // ssr服务端渲染
    async asyncData() {
        let {status, data: {list}} = await axios.get('http://localhost:3300/city/list')
        if (status === 200) {
            return {
                list
            }
        }
    }
}
</script>

<style lang="css">
</style>
