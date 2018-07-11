<template>
  <div class="mv" ref="mv">
    <scroll ref="scroll" class="mv-content" :data="mvList">
      <div>
        <div class="mv-list">
          <ul>
            <li @click="selectItem(item)" v-for="item in mvList" class="item">
              <div class="icon">
                <img width="100%" height="100%" v-lazy="item.pic">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.title"></h2>
                <p class="desc" v-html="'播放量：' + item.listenCount"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!mvList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Scroll from 'base/scroll/scroll'
  import {getSingerMv, getSingerMvInfo, getMvUrl} from 'api/mv'
  import {ERR_OK} from 'api/config'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        mvList: []
      }
    },
    created() {
      this._getSingerMv('001RRlcX2n2NLs', 0, 52)
    },
    methods: {
      _getSingerMv(singerMid, begin, num) {
        getSingerMv(singerMid, begin, num).then((res) => {
          // 语义化判断是否值返回成功
          if (res.code === ERR_OK) {
            this.mvList = res.data.list
          }
        })
      },
      selectItem(item) {
        if (item.vid) {
          getSingerMvInfo(item.vid).then((res) => {
            // 语义化判断是否值返回成功
            if (res.code === ERR_OK) {
              let fileid = res.mvinfo.data.mvlist[0].fileid
              if (fileid) {
                getMvUrl(fileid).then((result) => {
                  if (result.code === ERR_OK) {
                    // let url = result.getMvUrl.data[fileid][0].url[0]
                    // let vurl = result.getMvUrl.data[fileid][0].cn
                    // let vkey = result.getMvUrl.data[fileid][0].vkey
                    this.setMvUrl(result.getMvUrl.data.data[fileid])
                    console.log(result.getMvUrl.data.data[fileid])
                    this.$router.push({
                      path: `/mv/${fileid}`
                    })
                  }
                })
              }
            }
          })
        }
      },
      ...mapMutations({
        setMvUrl: 'SET_MV_URL'
      })
    },
    components: {
      Loading,
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .mv
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    margin-top: 20px
    .mv-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .mv-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
