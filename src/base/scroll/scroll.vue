<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {// 详情见 better-scroll  README
      probeType: {// 监听滚动事件
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      }
    },
    // 组件准备好时
    mounted() {
      setTimeout(() => {
        // 初始化滚动组件
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        // 第一个参数报错时
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
      },
      // 代理几个方法
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        // 重新计算高度
        this.scroll && this.scroll.refresh()
      }
    },
    // 监听data的变化
    watch: {
      data() {
        setTimeout(() => {
          // 重新计算组件高度
          this.refresh()
        }, 20)
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
