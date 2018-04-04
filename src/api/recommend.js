import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

/**
 * 利用JSONP封装请求
 */
export function getRecommend() {
  // qq音乐的接口
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  // 拷贝参数
  // var target = { a: 1 };
  // var source1 = { b: 2 };
  // var source2 = { c: 3 };
  // Object.assign(target, source1, source2);
  // target // {a:1, b:2, c:3}
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
