import storage from 'good-storage'

// 搜索的存储key
const SEARCH_KEY = '__search__'
// 最大条数
const SEARCH_MAX_LENGTH = 15

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
 * 保存搜索历史记录到storage
 * @param query
 */
export function saveSearch(query) {
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
