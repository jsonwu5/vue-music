import { playMode } from 'common/js/config'
import { loadSearch } from 'common/js/cache'

const state = {
  // 歌手列表
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
  currentIndex: -1,
  // 歌单对象
  disc: {},
  // 排行榜Top
  topList: {},
  // 搜索历史,从本地读取搜索历史列表
  searchHistory: loadSearch(),
  // 播放历史数据，从本地历史读取数据
  playHistory: [],
  // 收藏列表
  favoriteList: []
}

export default state
