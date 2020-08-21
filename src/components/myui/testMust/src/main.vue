<template>
    <div class="test" @click="onchack">
        <div class="btn1">{{testval}}</div>
        <!-- <div class="btn2">按钮2</div> -->
        
    </div>
</template>
<script>
export default {
    name:'HTest',
    data() {
        return{
            testval:'测试数据'
        }
    },
    props:{
        value:{
            type: String,
            default:'默认'
        }
    },
    methods:{
        onchack(){
            const newV = `${this.testval}_更新`;
            this.$emit('input', newV)
        }
    }
}
</script>
<style lang="scss" scoped>
.test{
    height: 50px;
    width: 100%;
    background: #ff3ccc
}
</style>