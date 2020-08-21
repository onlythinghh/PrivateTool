<template>
    <div class="Loadmore" >
        <div class="loadbox"  :style="{ height: wrapperHeight + 'px' }">
            <Loadmore
                :auto-fill="autoFill"
                :top-method="loadTop"
                :bottom-method="loadBottom"
                :bottom-all-loaded="allLoaded"
                @bottom-status-change="handleTopChange" 
                ref="loadmore"
            >
            <ul class="list_box">
                <li class="item" v-for="(item, index) in list" :key="index">{{item.a}}</li>
            </ul>
            <div slot="bottom" class="loadmore-bottom">
                <span v-show="bottomStatus  !== 'loading'" :class="{ 'rotate': bottomStatus  === 'drop' }">↓</span>
                <span v-show="bottomStatus  === 'loading'">Loading...</span>
            </div>
        </LoadMore>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            autoFill: true, // 默认true，false：关闭此状态。 初始化时会自动检测它的高度是否能够撑满其容器，如果不能则会调用 bottom-method，直到撑满容器为止
            bottomStatus : '', //上拉加载状态
            allLoaded: false, // 数据是否加载完毕 当所有数据加载完成后将此状态设为true就不会再去执行上拉或下拉事件获取数据
            list: [{a:'1'},{a:'2'},{a:'3'},{a:'4'},{a:'5'},{a:'6'},{a:'7'},{a:'8'},{a:'8'}],
            wrapperHeight:'0' // 容器高度
        };
    },
    mounted() {
        const winWidth = document.documentElement.clientWidth; // 获取屏幕宽度
        if(winWidth >= 768){
            console.log('1')
            this.wrapperHeight = document.documentElement.clientHeight  - 105;
        } else {
            console.log('2')
            this.wrapperHeight = document.documentElement.clientHeight;
        }
    },
    methods: {
        // 更新上拉状态
        handleTopChange(status) {
            console.log('status',status)
        this.bottomStatus  = status;
      },
        //  顶部下拉
        loadTop() {
            console.log('下拉',this.allLoaded)
            let newlist = this.list;
            let ae = {a:'0'+1}
            newlist.push(ae)
            this.list = newlist;
            console.log(' this.list', this.list)
            this.allLoaded = false;
            this.$refs.loadmore.onTopLoaded()
        },
        // 底部上拉
        loadBottom() {
            console.log('1212122',this.allLoaded)
            let newlist = this.list;
            let a = 0;
            
            setTimeout(()=>{
                let ae = {a:'0'+1}
                newlist.push(ae)
                this.list = newlist;
                this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
            this.$refs.loadmore.onBottomLoaded();
            }, 1500)
        },


    }
};
</script>
<style lang="scss" scoped>
.Loadmore {
    height: 100%;
    font-size: 14px;
    
    .loadbox{
        overflow-y: scroll;
    }
    .list_box{
        .item{
            color: #333;
            height: 130px;
            line-height: 30px;
            padding: 5px 10px;
            border-bottom: 1px solid #ccc; 
        }
    }
}
</style>

