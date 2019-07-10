<template>
  <div class="m-goe">
    <i class="el-icon-location" />{{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changeCity"> 切换城市 </nuxt-link>
    [{{ $store.state.geo.position.city }}]
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
