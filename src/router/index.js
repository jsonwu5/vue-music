import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/Singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({// 注册
  routes: [// 配置路由
    {
      path: '/',
      redirect: '/recommend'
    }, {  // }{ 中间需要留空格
      path: '/recommend',
      component: Recommend
    }, {
      path: '/singer',
      component: Singer,
      // 子组件路由
      children: [
        {
          // 以id为变量
          path: ':id',
          component: SingerDetail
        }
      ]
    }, {
      path: '/rank',
      component: Rank
    }, {
      path: '/search',
      component: Search
    }
  ]
})
