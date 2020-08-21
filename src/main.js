// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import laztLoad from 'vue-lazyload'
import store from './store/index'
import Mint from 'mint-ui'
import { Loadmore, InfiniteScroll, Spinner  } from 'mint-ui';
import myui from './components/myui' // 自定义插件
import  'mint-ui/lib/style.css'
import './tools/iscroll-lite'
import './tools/flexible'
import vfilter from './tools/filter'
Vue.component(Loadmore.name, Loadmore);
Vue.component(Spinner .name, Spinner )
Vue.use(InfiniteScroll);

Vue.use(laztLoad, {
  preLoad: 1.2,
  // loading: './assets/img/loading.gif',
  // error: './assets/img/err.png',
  attempt: 2,
  listenEvents: ['scroll']
})
Vue.use(myui)

// 注册全局过滤器
for(let key in vfilter) {
  Vue.filter(key, vfilter[key])
}
// 全局前置守卫 进入路由之前
router.beforeEach((to, from, next) => {
  console.log('前置守卫to：', to )
  console.log('前置守卫from：', from )
  // console.log('前置守卫next：', next )
  // if(from.meta.needLogin && to.name=== 'Home') {
  //   console.log('取消离开')
  //   next(false) // 取消离开
  // } else {
  //   next()
  // }
  next()
})

// 全局后置钩子，进入路由之后调用
router.afterEach((to, from)=> {
  console.log('后置钩子to：', to)
  console.log('后置钩子from:', from)
})

Vue.config.productionTip = false

export const eventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
