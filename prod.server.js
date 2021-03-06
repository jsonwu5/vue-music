let express = require('express')
let compression = require('compression')
let config = require('./config/index')
let axios = require('axios')
const bodyParser = require('body-parser')

let port = process.env.PORT || config.build.port

let app = express()

// 代理转发
let apiRoutes = express.Router()

// 代理转发qq歌单接口
apiRoutes.get('/getDiscList', function (req, res) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    // 将结果输出到浏览器端
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

// 代理转发qq歌单获取歌曲列表接口
apiRoutes.get('/getCdInfo', function (req, res) {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      // 正则匹配括号里面的JSON字符串内容
      // let reg = /^\w+\(({[^()]+})\)$/
      // 查找非单词字符开头 一到多个 ({ 括号内 查找单个字符一到多个
      let reg = /^\w+\(({.+})\)$/
      let matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    // 将结果输出到浏览器端
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

// 代理转发qq歌词接口
apiRoutes.get('/lyric', function (req, res) {
  let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    let ret = response.data
    if (typeof ret === 'string') {
      // 正则匹配括号里面的JSON字符串内容
      let reg = /^\w+\(({.+})\)$/
      let matches = response.data.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    // 将结果输出到浏览器端
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.post('/api/getPurlUrl', bodyParser.json(), function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.post(url, req.body, {
    headers: {
      referer: 'https://y.qq.com/',
      origin: 'https://y.qq.com',
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})


// 代理转发搜索接口
apiRoutes.get('/search', function (req, res) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

app.use(compression())

// 将dist目录作为静态资源目录
app.use(express.static('./dist'))

// 没有配置端口则从config中的index.js中读取端口配置
// let port = process.env.PORT || config.build.port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
