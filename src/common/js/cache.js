import storage from 'good-storage'

// 搜索的存储key
const SEARCH_KEY = '__search__'
// 最大条数
const SEARCH_MAX_LENGTH = 15

// 播放key
const PLAY_KEY = '__play__'
// 最大播放歌曲历史数据条数
const PLAY_MAX_LENGTH = 200

// 收藏歌曲key
const FAVORITE_KEY = '__favorite__'
// 最大收藏条数
const FAVORITE_MAX_LENGTH = 200

/**
 * 插入一条并删除最后一条，保持15条
 * @param arr {Array} 存储的数组
 * @param val {String} 要存储的值
 * @param compare {function} 比较函数
 * @param maxLen {Number} 最大值
 */
function insertArray(arr, val, compare, maxLen) {
  // findIndex ES6 API 查找当前数组中是否有某个元素
  const index = arr.findIndex(compare)
  // 第一条数据
  if (index === 0) {
    return
  }
  // 数组中有这条数据
  if (index > 0) {
    // 删掉之前的数据
    arr.splice(index, 1)
  }
  // 插入最新的数据，在第一个位置
  arr.unshift(val)
  // 超出最大值
  if (maxLen && arr.length > maxLen) {
    // 删除最后一条
    arr.pop()
  }
}

/**
 * 删除搜索历史记录
 * @param arr
 * @param compare
 */
function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

/**
 * 保存搜索历史记录到storage
 * @param query
 */
export function saveSearch(query) {
  // 获取缓存中的列表
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

/**
 * 从本地缓存读取Search列表
 * @return {*}
 */
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

/**
 * 删除搜索历史记录
 * @param query
 * @return {*}
 */
export function deleteSearch(query) {
  // 获取缓存中的列表
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

/**
 * 清空全部搜索历史
 * @return {Array}
 */
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

/**
 * 存储当前的sonog
 * @param song
 */
export function savePlay(song) {
  // 没有的话默认为空数组
  let songs = storage.get(PLAY_KEY, [])
  // 插入当前歌曲，如果存在则挪到前面
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  // 返回新的数组
  return songs
}

/**
 * 读取播放歌曲历史数据
 * @return {*}
 */
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

/**
 * 收藏歌曲并保存到本地
 * @param song
 * @return {*}
 */
export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

/**
 * 取消收藏歌曲并从本地删除收藏的歌曲
 * @param song
 * @return {*}
 */
export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

/**
 * 从本地读取收藏的歌曲数据
 * @return {*}
 */
export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
