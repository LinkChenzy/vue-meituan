<template>
  <div class="m-crumbs">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">美团</el-breadcrumb-item>
      <el-breadcrumb-item>{{ decodeURIComponent(keyword) }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>
