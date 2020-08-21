<template>
    <div class="childrenB" @click="eventTwo">B组件</div>
</template>
<script>
import { Vm } from '../../sever/Vm'
export default {
    data () {
        return {
            age: '20'
        }
    },
    methods:{
        eventTwo () {
            // 发送一个eventTwo事件(发送的事件名可以随意去但是一定要和监听事件名一致)
            Vm.$emit('eventTwo', this.age)
        }
    }
}
</script>
<style lang="scss" scoped>
.childrenB{
    margin: 10px;
    height: 30px;
    font-size: 14px;
    background: red
}
</style>


