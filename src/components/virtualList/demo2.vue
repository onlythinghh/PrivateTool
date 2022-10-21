<template>
    <div ref="list" @scroll="scrollEvent" class="infinite-list-container">
        <!-- infinite-list为容器内的占位，高度为总列表高度，用于形成滚动条 -->
        <div class="infinite-list-phantom" :style="{height: listHeight + 'px'}"></div>
        <div class="infinite-list" :style="{ transform: getTransform }">
            <div 
                ref="items"
                class="infinite-list-item"
                v-for="item in visibleData"
                :key="item.id"
                :style="{height: itemSize+ 'px', lineHeight: itemSize + 'px'}"
            >{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        // 列表所有数据
        listData:{
            type: Array,
            default: () => []
        },
        // 每项高度
        itemSize: {
            type: Number,
            default: 100
        },
        estimatedItemSize: {
            type: Number,
            default: 120
        }

    },
    computed: {
        listHeight() {
            return this.listData.length * this.itemSize;
            // return this.positions[this.positions.length - 1].bottom
        },
        // 可显示列表项数量
        visibleCount() {
            return Math.ceil(this.screenHeight / this.itemSize)
        },
        // 计算偏移量的位置
        getTransform() {
            return `translate3d(0, ${this.startOffset}px, 0)`
        },
        // 真实列表数据（实际要渲染的数据）
        visibleData() {
            return this.listData.slice(this.start, Math.min(this.end, this.listData.length))
        }
    },
    data() {
        return {
            screenHeight: 0, // 可视区高度
            startOffset: 0, // 偏移量
            start: 0, // 起始索引
            end: null, // 结束索引
            positions: [

            ]
        }
    },
    created() {
        // this.initPositions()
    },
    mounted() {
        
        // 初始化时获取可视区高度
        this.screenHeight = document.documentElement.clientHeight
        // 设置父元素高度
        this.$refs.list.style.height = this.screenHeight + 'px'
        this.start = 0
        this.end = this.start + this.visibleCount
    },
    methods: {
        scrollEvent() {
            // 获取当前滚动位置
            let scrollTop = this.$refs.list.scrollTop
            // let scrollTop = this.getStartIndex(this.$refs.list.scrollTop)
            // 设置起始索引
            this.start = Math.floor(scrollTop / this.itemSize)
            // 设置结束位置索引
            this.end = this.start + this.visibleCount
            // 设置偏移量
            this.startOffset = scrollTop - (scrollTop % this.itemSize)

            // if(this.start >= 1) {
            //     this.startOffset = this.positions[this.start - 1].bottom
            // } else {
            //     this.startOffset = 0
            // }
        },

        getStartIndex(scrollTop){
            return this.binartStart(this.positions, scrollTop)
        },
        binartStart(list, value) {
            let start = 0
            let end = list.length - 1;
            let tempIndex = null
            while(start <= end) {
                let midIndex = parseInt((start + end) / 2)
                let midValue = list[midIndex].bottom;
                if(midValue === value){
                    return midIndex + 1;
                }else if(midValue < value){
                    start = midIndex + 1;
                }else if(midValue > value){
                    if(tempIndex === null || tempIndex > midIndex){
                        tempIndex = midIndex;
                    }
                    end = end - 1;
                }
            }
            return tempIndex
        },


        initPositions() {
            this.positions = this.listData.map((item, index) => {
                return {
                    index,
                    height: this.estimatedItemSize,
                    top: index * this.estimatedItemSize,
                    bottom: (index + 1) * this.estimatedItemSize
                }
            })
        }
    },
    updated() {
        // let nodes = this.$refs.items
        // nodes.forEach(node => {
        //     console.log('nodes',node.getBoundingClientRect())
        //     let rect = node.getBoundingClientRect();
        //     let height = rect.height
        //     let index = +node.id.slice(1)
        //     let oldHeight = this.positions[index].height
        //     let dValue = oldHeight - height

        //     if(dValue) {
        //         this.positions[index].bottom = this.positions[index].bottom - dValue
        //         this.positions[index].height = height
        //         for(let i= index + 1; i<this.positions.length; i++) {
        //             this.positions[i].top = this.positions[i-1].bottom.bottom
        //             this.positions[i].bottom = this.positions[i].bottom - dValue
        //         }
        //     }

        // });
    }
}
</script>
<style lang="scss" scoped>
.infinite-list-container{
    overflow: auto;
    width: 100%;
    position: relative;
}
.infinite-list{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .infinite-list-item{
        border-bottom: 1px solid #ccc;
    }
}
</style>