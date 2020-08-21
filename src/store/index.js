import Vue from 'vue'
import Vuex from 'vuex'
import state from './store'

Vue.use(Vuex)

const getters = {
  count: state => state.count,
  name: state => state.name
}

const actions = {
  CountAdd({commit}) {
    commit('CountAdd')
  },
  changeName({commit}, name) {
    commit('changeName', name)
  }
}

const mutations = {
  CountAdd(state) {
    state.count += 1
  },
  changeName(state, name) {
    state.name = name
  }
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
/** 
 * vuex 是专门为vue应用程序设计的状态管理工具，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化；
 * vuex的构成：
 * 1、state: state是存储的单一状态，就是需要存储的基本数据。
 * 2、getters: getters是store的计算属性，对state加工处理，是派生出来的数据。类似computed计算属性，getter返回会根据他的依赖被缓存起来，并且只有当他的依赖值发生改变才会重新计算；
 * 3、mutations：mutations提交更改数据，通过store.commit方法更改state里的存储状态，该方法是个同步函数。moutations的第一个参数是固定参数state,接收的是vuex中的state对象。
 * 一般情况下用此方法修改State，理论上是修改State的唯一途径；
 * 4、actions: actions比较像一个装饰器，用于提交mutations（通过commit()来触发mutations），而不能直接更变state的状态，此方法与mutations不同的是
 * actions可以异步执行，并且他的固定参数是context但是 context 是 state 的父级，包含 state、getters，一般注重于业务代码、异步请求的时候使用。
 * 5、moudle：是store分割的模块，可以在同一个项目中存在多个store,每个store都有自己的getters、mutations、actions而互不影响。
 * 6、辅助函数：vuex提供了mapState、mapGetters、mapMutations、mapActions等辅助函数提供给开发在vm中处理store。
 * vuex设计思想：vuex设计思想借鉴了Flux、Redux，将数据存放到全局的store，再讲store挂载到全局的每个实例组件中，利用vue.js细粒度数据响应机制来进行高效的数据更新。
*/