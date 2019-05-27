<template>
  <section class="container">
    <h1 class="title">
      search page
    </h1>
    <ul>
        <li v-for="(item , idx) in list" :key="idx">{{item}}</li>
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
