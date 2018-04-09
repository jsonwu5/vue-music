import {playMode} from 'common/js/config'

const state = {
  singer: {},
  // 播放状态
  playing: false,
  // 全屏状态
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放歌曲
  currentIndex: -1
}

export default state
