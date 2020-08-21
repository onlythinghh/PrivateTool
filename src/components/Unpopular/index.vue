<template>
    <div class="Unpopular">
      <p>路由导航守卫</p>
      <!-- vue不常用的 属性 -->
      <!-- <router-link :to="{name:'detail'}" @click.native="handelNative">123123</router-link> -->
      <!-- 路由导航守卫 -->
      <router-link to="/slidePanel">slidePanel</router-link>
    </div>
</template>
<script>
export default {
  data() {
    return{

    }
  },
  
    methods:{
      handelNative(){
        console.log('11111')
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log('进入路由之前to:', to)
      next()
    // 在路由独享守卫后调用 不！能！获取组件实例 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。但是可以个通过传一回调给 next来访问组件实例。
    //在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数
    // next(vm => {
      // 通过 `vm` 访问组件实例`this` 执行回调的时机在mounted后面，
    // })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    // 在当前路由改变，但是该组件被复用时调用 可以访问组件实例 `this`
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  },
  beforeRouteLeave (to, from, next) {
    console.log('离开路由时to', to)
    next()
    // 导航离开该组件的对应路由时调用，可以访问组件实例 `this`
  }
}
</script>
<style lang="scss" scoped>
.Unpopular{width: 100%; }
</style>