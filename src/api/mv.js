import {commonParams} from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

export function getSingerMv(singerMid, begin, num) {
  const url = debug ? '/api/getSingerMv' : 'http://193.112.107.209/music/api/getSingerMv'
  // '001RRlcX2n2NLs', 0, 52
  const data = Object.assign({}, commonParams, {
    jsonpCallback: 'singermvlistMusicJsonCallback',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerMid,
    order: 'listen',
    begin: begin,
    num: num,
    cid: 205360581,
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerMvInfo(vid) {
  const url = debug ? '/api/getMvInfo' : 'http://193.112.107.209/music/api/getMvInfo'
  const data = Object.assign({}, commonParams, {
    callback: 'getUCGI8883733217493717',
    jsonpCallback: 'getUCGI8883733217493717',
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: {
      comm: {
        ct: 24,
        cv: 4747474
      },
      mvinfo: {
        module: "MvService.MvInfoProServer",
        method: "GetMvInfoList",
        param: {
          vidlist: [vid],
          externlist: [2],
          video: {
            quality: -1,
            format: 0
          }
        }
      }
    },
    vid: vid
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res.data)
    return Promise.resolve(res.data)
  })
}

export function getMvUrl(fileid) {
  const url = debug ? '/api/getMvUrl' : 'http://193.112.107.209/music/api/getMvUrl'
  const data = Object.assign({}, commonParams, {
    // 1049_M2110600000tiun12Z8isS1001571640
    data: {
      "getMvUrl": {
        "module": "Mv.MvDownloadUrlServer",
        "method": "GetMvUrls",
        "param": {
          "fileid": [fileid],
          "filetype": [-1]
        }
      }
    },
    callback: 'jQuery112309316304726400084_1531296856225',
    loginUin: 0,
    hostUin: 0,
    outCharset: 'GB2312',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res.data)
    return Promise.resolve(res.data)
  })
}
