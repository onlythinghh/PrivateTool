<template>
    <div class="virtualList">
        <!-- 虚拟列表演示 -->
        <!-- <virtuallist1 :size='40' :remain='15' :items="list" /> -->
        <virtuallist2 :itemSize='40' :listData="list" />
    </div>
</template>
<script>
import virtuallist1 from './demo1.vue'
import virtuallist2 from './demo2.vue'
export default {
    components:{
        virtuallist1,
        virtuallist2
    },
    data() {
        return {
            list: []
        }
    },
    created() {
        for(let i=0; i<10000; i++) {
            this.list.push({name: `我是第${i+1}个`, id: i})
            // this.list.push({name: this.$faker().lorem.sentences(), id: i})
        }
    }
}
</script>