import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'

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

export function getDiscList() {
  const url = '/api/getDiscList'

  // 拷贝参数
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 获取歌单中的歌曲列表
 * @param disstid {String} 歌单ID
 */
export function getSongList(disstid) {
  const url = 'api/getCdInfo'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
