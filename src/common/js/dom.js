// dom通用操作相关
/**
 * 添加Class样式
 * @param el {Object} DOM对象
 * @param className {String} 样式类名
 */
export function addClass(el, className) {
  el.classList.add(className)
}

/**
 * 判断是否已经存在Class
 * @param el {Object} DOM对象
 * @param className {String} 样式类名
 * @return {boolean} 返回结果
 */
export function hasClass(el, className) {
  return el.classList.contains(className)
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

// 能力检测，创建一个标签并获取style
let elementStyle = document.createElement('div').style

// 供应商前缀支持检测
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  // 检测支持哪个前缀
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

/**
 * 检测浏览器前缀兼容性自动添加相应前缀
 * @param style {String} 需要加前缀的样式Name
 * @return {*} 返回已加前缀的样式Name
 */
export function prefixStyle(style) {
  // 都不满足
  if (vendor === false) {
    return false
  }

  // 如果支持标准的，返回原始样式
  if (vendor === 'standard') {
    return style
  }
  // 浏览器前缀 + 上样式的首字母大写 + 剩余字符串
  // substr：从起始索引号提取字符串中指定数目的字符。
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
