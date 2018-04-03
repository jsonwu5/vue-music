import originJsonp from 'jsonp'

/**
 * 对外暴露一个方法
 * @param url {String} 请求的URL
 * @param data {json} url后面拼接的参数
 * @param option {json} jsonp的 option
 * @return {Promise<any>}
 */
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  // resolve代表Promise成功，reject代表失败
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      // 非err时返回data
      if (!err) {
        // 后端返回数据
        resolve(data)
      } else {
        // 出错返回出错信息
        reject(err)
      }
    })
  })
}

/**
 * 给url后面拼接上参数
 * @param data {json} 用来拼接的参数
 * @return {string} 返回拼接好data
 */
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    // es6语法
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
