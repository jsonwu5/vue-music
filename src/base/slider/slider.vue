<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'

  export default {
    data() {
      return {
        // 控制轮播图上的圆点显示与交互
        dots: [],
        currentPageIndex: 0 // 默认为第一个
      }
    },
    // 外部控制组件有哪些属性
    props: {
      loop: {// 循环轮播
        type: Boolean,
        default: true
      },
      autoPlay: {// 自动轮播
        type: Boolean,
        default: true
      },
      interval: {// 自动轮播的间隔，毫秒
        type: Number,
        default: 4000
      }
    },
    // 钩子函数
    mounted() {
      // 设置一个延时20毫秒，浏览器刷新时17毫秒一次
      setTimeout(() => {
        // 初始化
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        // 自动播放轮播图
        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      // 监听窗口变化
      window.addEventListener('resize', () => {
        // 如果还没有创建则什么都不做
        if (!this.slider) {
          return
        }
        // 重新计算宽度
        this._setSliderWidth(true)
        // better-scroll方法，刷新轮播图
        this.slider.refresh()
      })
    },
    methods: {
      // isResize：标识位，是否为resize
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        // console.log(this.children.length)

        // 设置sliderGroup的宽度
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        // 计算sliderGroup的宽度
        for (let i = 0; i < this.children.length; i++) {
          // 获取到每一个子元素
          let child = this.children[i]
          // 给每一个元素添加样式，确保渲染的样式是正确的
          addClass(child, 'slider-item')

          // 设置每个child等于父元素的宽度
          child.style.width = sliderWidth + 'px'
          // 总sliderGroup宽度累加
          width += sliderWidth
        }

        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      // 初始化轮播图组件插件
      _initSlider() {
        // 第一个参数为DOM，第二个参数是options
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,  // 无缝循环
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        // 绑定滚动完毕事件，每次滚动完毕
        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex

          // 无限轮播
          if (this.autoPlay) {
            // 自动轮播前先清除掉Timer
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          // Batter-scroll的方法，0代表Y方向，400表示时间间隔
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    // 组件销毁时，清理计时器
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      this.slider.disable()
      clearTimeout(this.timer)
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
