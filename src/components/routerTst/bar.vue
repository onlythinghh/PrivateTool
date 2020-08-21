<template>
    <div class="routerBar">
        
        <div class="load-more-wrapper" @touchstart="touchStart($event)" @touchend="touchEnd($event)">
            <div class="inner">
                <!-- <slot></slot> -->
                <ul>
                    <li v-for="(item, index) in list " :key="index">{{item}}</li>
                </ul>
                <div class="load-more" v-show="enableLoadMore">{{loadMoreText}}</div>  
                <div class="load-end" v-show="!enableLoadMore">已经到底了!</div>  
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "LoadMore",
    data() {
        return {
            loadMoreText: "正在加载。。。",
            enableLoadMore: true,
            cs:0,
            list:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
        }
    }, 
    methods: {
        touchStart(e) {
            this.startY = e.targetTouches[0].pageY;
            this.startX = e.targetTouches[0].pageX;  
        },
        scrollToEnd(e) {
            let scrollHeight = this.$el.scrollHeight; 
            let clientHeight = this.$el.clientHeight; 
            let scrollTop = this.$el.scrollTop;  
            
            // if (scrollTop + clientHeight >= scrollHeight || this.enableLoadMore) {
            //     this.doLoadMore()  
            // } 
        },
        touchEnd(e) {

            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight;
            console.log('scrollHeight',scrollHeight,scrollTop, clientHeight)
            if (scrollTop + clientHeight >= scrollHeight - 50) { // 如果滚动到接近底部，自动加载下一页
                //事件处理
                console.log("0000")//此处可以添加数据请求
                this.cs++;
                if(this.cs>3) { this.enableLoadMore = false; console.log('加载完成'); return }
                let last = this.list[this.list.length -1]
                setTimeout(() => {
                    for(let i = 1; i < 10; i ++) {
                        this.list.push(last + i)
                    }
                }, 1500);
            }

        },
    }
}
</script>
<style lang="scss" scoped>
.load-more-wrapper {
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transition-duration: 300ms;
    .load-more, .load-end {
        color: #aea699;
        font-size: .26rem;
        margin: .3rem 0;
        text-align: center;
    }
    .inner{
        li{
            height: 50px;
            border-bottom: 1px solid #ccc;
        }
    }
}
</style>
