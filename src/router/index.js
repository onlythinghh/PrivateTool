import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import redPacket from '@/components/redPacket/redPacket'
import Address from '@/components/address/address'
import emitOn from '@/components/emitOn'
import arrayTest from '@/components/arrayTest/index'
import lazyLoad from '@/components/lazyLoad/lazyLoad'
import qrcode from '@/components/qrCode/qrcode'
import Loadmore from '@/components/Loadmore/Loadmore'
import RouterTst from '@/components/RouterTst'
import rutTst from '@/components/RouterTst/vueTest'
// const rutTst = () => import('@/components/RouterTst/vueTest')
import foo from '@/components/RouterTst/foo'
import bar from '@/components/RouterTst/bar'
import slidePanel from '@/components/slidePanel/index'
import debounce from '@/components/debounce/index'
import Unpopular from '@/components/Unpopular/index'
import vuexTest from '@/components/vuexTest/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/redPacket',
      name: 'redPacket',
      component: redPacket
    },
    {
      path: '/Address',
      component: Address
    },
    {
      path: '/emitOn',
      component: emitOn
    },
    {
      path: '/arrayTest',
      component: arrayTest
    },
    {
      path: '/lazyLoad',
      component: lazyLoad
    },
    {
      path: '/qrcode',
      component: qrcode
    },
    {
      path: '/Loadmore',
      component: Loadmore
    },
    {
      path: '/RouterTst/',
      component: RouterTst,
      children:[
        {
          path: '/rutTst/:id',
          component: rutTst,    
        }
      ]
    },
    // { // 动态路由若需要跳转页面可以将路由充上面的子路由中移出来做顶层路由用（）
    //   path: '/rutTst/:id',
    //   component: rutTst,    
    // },
    {
      path:'/foo',
      component: foo,
      name:'foo'
    },
    {
      path:'/bar',
      component: bar,
      name:'bar'
    },
    {
      path:'/slidePanel',
      component: slidePanel,
    },
    {
      path: '/debounce',
      component: debounce,
      beforeEnter:(to, from, next) => {
        console.log('独享守卫to:', to)
        next()
        // 参数用法什么的都一样,调用顺序在全局前置守卫后面，所以不会被全局守卫覆盖
      }
    },
    {
      path: '/Unpopular',
      component: Unpopular
    },
    {
      path: '/vuexTest',
      component: vuexTest,
      meta:{
        needLogin: true
      }
    }
  ]
})
