<template>
  <div>
    <!-- 大写字母 -->
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in UplowerList" :key="item">
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>
    <!-- 城市分类 -->
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-' + item.title">{{ item.title }}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
import jspinyin from 'js-pinyin'
export default {
  data() {
    return {
      UplowerList: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: [] // [{title:'A',city:['安庆','鞍山']}]
    }
  },
  mounted: async function() {
    const self = this
    const blocks = []
    let firstcode
    let code
    const list = {}
    const {
      status,
      data: { city }
    } = await self.$axios.get('/geo/city')
    if (status === 200) {
      // list 数据组成
      city.map(item => {
        // 取城市的首位小写字母
        firstcode = jspinyin
          .getFullChars(item.name)
          .toLocaleLowerCase()
          .slice(0, 1)
        // code码
        code = firstcode.charCodeAt(0)
        if (code > 97 && code < 123) {
          if (!list[firstcode]) {
            list[firstcode] = []
          }
          list[firstcode].push(item.name)
        }
      })
      //   window.console.log(Object.entries(list))
      // blocks 数据
      for (const [k, v] of Object.entries(list)) {
        blocks.push({
          title: k.toUpperCase(),
          city: v
        })
      }
      // 排序输出
      self.block = blocks.sort(
        (a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0)
      )
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/changeCity/categroy.scss';
</style>
