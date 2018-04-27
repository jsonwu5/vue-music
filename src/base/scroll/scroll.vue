<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  export default {
    props: {// 详情见 better-scroll  README
      probeType: {// 监听滚动事件
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      direction: {
        type: String,
        default: DIRECTION_V
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
          click: this.click,
          eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
        })

        if (this.listenScroll) {
          // 保留外层的this
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }

        // 下拉刷新事件
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 拉至底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      // 代理几个方法，拓展方法，对外提供方法
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        // 重新计算高度
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    // 监听data的变化
    watch: {
      data() {
        setTimeout(() => {
          // 重新计算组件高度
          this.refresh()
          console.log('刷新scroll');
        }, this.refreshDelay)
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
