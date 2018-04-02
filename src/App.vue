<template>
  <div id="app">
    <m-header></m-header>
  </div>
</template>

<script type="text/ecmascript-6">
  // 在webpack.base.conf.js中配置components的别名
  import MHeader from 'components/m-header/m-header'

  export default {
    components: {// 注册
      MHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
