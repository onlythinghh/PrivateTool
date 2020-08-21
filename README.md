# red-packet

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## VUE 采集
1. vue父组件和子组件生命周期钩子函数执行顺序大致归类为4部分：
  + 加载渲染过程
    >父beforeCreate -> 父Create -> 父beforeMount -> 子beforeCreate -> 子Create ->子befaoreMount -> 子mounted -> 父mounted 
  + 子组件更新过程
    >父beforeUpdate -> 子befareUpdate -> 子Update -> 父Update
  + 父组件更新过程
    >父beforeUpdate -> 父Update
  + 销毁过程
    >父bedoreDestory -> 子bedoreDestory -> 子Destory -> 父Destory
2. 父组件监听子组件的生命周几
  + exp1:利用@hook 来监听，其他方生命周期都可以使用此方法监听（推荐）
    // Parent.vue
    `<Child @hook:mounted="doSomething" />`
     ```
    doSomething() {
      console.log('父组件监听到 mounted 钩子函数 ...');
    },  
    
    // child.vue 
    mounted(){
      console.log('子组件触发 mounted 钩子函数 ...');
    }, 
    ```
  + exp2: 父组件通过绑定子组件的生命周期来监听子组件的生命周期,但是此方法需要子组件通过$emit手动触发父组件的事件
    // Parent.vue
    `<Child @mounted="doSomething"/>`
    ```
    // Child.vue
    mounted() {
      this.$emit("mounted");
    }
    ```
3. 为什么组件中的 data 必须是一个函数，然后 return 一个对象，而 new Vue 实例里，data 可以直接是一个对象？
  > 因为组件是用来复用的，且 JS 里对象是引用关系，如果组件中 data 是一个对象，那么这样作用域没有隔离，子组件中的 data 属性值会相互影响，如果组件中 data 选项是一个函数，那么每个实例可以维护一份被返回象的独立的拷贝，组件实例之间的 data 属性值不会互相影响；而 new Vue 的实例，是不会被复用的，因此不存在引用对象的问题.
4. vue-router 路由模式有几种？
  > + vue-router 有 3 种路由模式：hash、history、abstract 3种路由模式:
    + hash: 使用url hash值来做路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
    + history: 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式
    + abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式 
5. 什么是 MVVM？
    > + Model–View–ViewModel （MVVM） 是一个软件架构设计模式, MVVM的核心是viewModel层，它类似于中转站，负责管理Model中的数据对象来让数据变的更加方便管理和使用。
      + 该层向上与视图层（View）进行双向绑定，向下与Model层通过接口请求进行数据交互，实现承上启下的作用。MVVM 这样框架实现了双向绑定， ViewModel 的内容会实时展现在 View 层，前端开发者再也不必低效又麻烦地通过操纵 DOM 去更新视图，前端开发只需要维护ViewModel就会自动更新相应的View层。
      + （1）View层
        > View是视图层。指用户界面，前端主要由 HTML 和 CSS 来构建
      + （2）Model层
        > Model指数据模型，后端进行各种业务逻辑处理和数据操控，对于前端来说就是后端提供给前端的api接口
      + (3) ViewModel层
        > ViewModel是有前端人员组织生成和维护的视图数据层，前端开发对从后端获取的Model数据进行转换和处理，做二次封装后生成符合View层使用预期的视图数据模型