<template>
  <!--转场动画-->
  <transition name="slide">
    <div class="music-list">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
      <div class="bg-image" ref="bgImage">
        <video width="100%" controls="controls" autoplay="autoplay" name="media" v-if="videoUrl.length>0">
          <source :src="videoUrl" type="video/mp4">
        </video>
        <!--<div class="filter" ref="filter"></div>-->
      </div>
      <div class="bg-layer" ref="layer"></div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        videoUrl: '',
        title: 'MVTest'
      }
    },
    created() {
      this.getUrl(0)
    },
    methods: {
      getUrl(index) {
        let res = this.mvUrl
        console.log('URL：%o' + res)
        this.videoUrl = res[index].url[index] + res[index].cn + '?vkey=' + res[index].vkey
      },
      back() {
        // 点击返回上一页
        this.$router.back()
      },
    },
    computed: {
      ...mapGetters([
        'mvUrl'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      padding-top: 42px
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
