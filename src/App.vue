<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--缓存到内存-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  // Class首字母大写，标签使用小写，采用“-”连字符
  // 在webpack.base.conf.js中配置components的别名
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab'
  import Player from 'components/player/player'

  export default {
    components: {// 注册
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
