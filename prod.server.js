var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var app = express()

// 代理转发
var apiRoutes = express.Router()

// 代理转发qq歌单接口
apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
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
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      // 正则匹配括号里面的JSON字符串内容
      // var reg = /^\w+\(({[^()]+})\)$/
      // 查找非单词字符开头 一到多个 ({ 括号内 查找单个字符一到多个
      var reg = /^\w+\(({.+})\)$/
      var matches = ret.match(reg)
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
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      // 正则匹配括号里面的JSON字符串内容
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
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

app.use('/api', apiRoutes)
// 结束

// 将dist目录作为静态资源目录
app.use(express.static('./dist'))

// 没有配置端口则从config中的index.js中读取端口配置
var port = process.env.PORT || config.build.port

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
