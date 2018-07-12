// 抛出公共参数，不用为每个请求写同样的参数
export const commonParams = {
  g_tk: 2030128125,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback',
  prefix: 'jp'
}

// 语义化状态码，常量，0表示正确的值
export const ERR_OK = 0

export const DOMAIN = 'http://193.112.107.209/music/'
