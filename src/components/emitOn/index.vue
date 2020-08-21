<template>
<!-- $emit() 和$on() 进行兄弟节点之间的通信 -->
<!-- 父子组件通信使用 props,反之 通过$emit()发送事件  -->
    <div class="preant">
        <div class="cont">姓名{{name}}  年龄{{age}}</div>
        <childA></childA>
        <childB></childB>
    </div>
    
</template>
<script>
import childA from './childrenA';
import childB from './childrenB';
import { Vm } from '../../sever/Vm'
export default {
    data () {
        return {
            name: 'p',
            age: '0'
        }
    },
    components:{
        childA,
        childB
    },
    mounted() {
        // 监听A组件的eventOne点击事件
        Vm.$on('eventOne', (msgA) => {
            console.log('11111',msgA)
            this.name = msgA
        });
        // 监听B组件的eventTwo点击事件
        Vm.$on('eventTwo', (msgB) => {
            this.age = msgB
            console.log('222222',msgB)
        })
    },
    created () {
    },
    methods:{
         
    }
}
</script>
<style lang="scss" scoped>
.preant{
    .cont{
        height: 50px;
        margin-bottom: 30px;
        border-bottom: 1px solid salmon;
        font-size: 14px;
    }
}
</style>


