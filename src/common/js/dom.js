// dom通用操作相关
/**
 * 添加Class样式
 * @param el {Object} DOM对象
 * @param className {String} 样式类名
 */
export function addClass(el, className) {
  // 如果已经存在Class则什么都不做
  if (hasClass(el, className)) {
    return
  }
  // 把Class拆开
  let newClass = el.className.split(' ')
  // 把Class添加进去
  newClass.push(className)
  // 在连接起来
  el.className = newClass.join(' ')
}

/**
 * 判断是否已经存在Class
 * @param el {Object} DOM对象
 * @param className {String} 样式类名
 * @return {boolean} 返回结果
 */
export function hasClass(el, className) {
  // 正则 (^|\s)：开头或者空白字符在前面
  // (\\s|$)')： 以空白字符或者结束
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
