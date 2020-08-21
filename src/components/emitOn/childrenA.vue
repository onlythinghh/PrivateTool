<template>
    <div class="childrenA" @click="eventOne">A组件</div>
</template>
<script>
import { Vm } from '../../sever/Vm'
export default {
    data () {
        return {
            name: '张三'
        }
    },
    methods:{
        eventOne () {
            console.log('123123')
            // 发送一个eventOne事件(发送的事件名可以随意去但是一定要和监听事件名一致)
            Vm.$emit('eventOne', this.name)
        }
    }
}
</script>
<style lang="scss" scoped>
    .childrenA{
         margin: 10px;
        height: 30px;
        font-size: 14px;
        background: #4c79f5
    }
</style>


