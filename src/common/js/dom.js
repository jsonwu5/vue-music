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

/**
 * 获取DOM中 data- 后面指定的 data-XXX 的值
 * @param el {Object} DOM
 * @param name {String} data-后面的name
 * @param val {String} 值，用来拓展
 * @return {*} 返回值
 */
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  // 如果有值，则设置 data- name 的值为 val
  if (val) {
    return el.setAttribute(name, val)
  } else {
    // 没有值就获取 data-XXX 的值
    return el.getAttribute(name)
  }
}
