<template>
    <div class="Home">
        <p>全部</p>
        <ul>
            <li>
                <router-link to="/Address" >地址</router-link>
            </li>
            <li>
                <router-link to="/redPacket" >红包雨</router-link>
            </li>
            <li>
                <router-link to="/emitOn">组件通信</router-link>
            </li>
            <li>
                <router-link to="/arrayTest">数组测试</router-link>
            </li>
            <li>
                <router-link to="/lazyLoad">图片懒加载</router-link>
            </li>
            <li>
                <router-link to="/qrcode">二维码</router-link>
            </li>
            <li>
                <router-link to="/Loadmore">上拉刷新下拉加载</router-link>
            </li>
            <li>
                <router-link to="/RouterTst">RouterTst</router-link>
            </li>
            <li>
                <router-link to="/slidePanel">slidePanel</router-link>
            </li>
            <li>
                <router-link to="/debounce">debounce 防抖节流</router-link>
            </li>
            <li>
              <router-link to="/vuexTest">vuex测试</router-link>
            </li>
            <li>
              <router-link to="/Unpopular">组件内路由守卫</router-link>
            </li>
            <li>
              <router-link to="/ruleTest">规则检验测试</router-link>
            </li>
            <li>
              <router-link to="/hightFun">高阶函数</router-link>
            </li>
            <li @click="testClick"><h3 id="h">{{msg}}</h3></li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
          msg: '123'
        }
    },
    methods:{
        testClick:function() {
            this.msg = '456'
            this.$nextTick(function(){
                let dom = document.getElementById('h').innerText
                console.log('inntest:', dom)
                if(dom == '123'){
                    console.log("文本data被修改后dom内容没立即更新");
                } else {
                    console.log("文本data被修改后dom内容被马上更新了");
                }
            })
        }
    }
    
}
</script>
<style lang="scss" scoped>
.Home{
    font-size: 28px;
}
</style>



