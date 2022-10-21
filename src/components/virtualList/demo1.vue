<template>
    <div class="virtualList_demo1">
        <p>虚拟列表demo1</p>
        <div id="VirtualList" ref="VirtualList" @scroll="handleScroll">
            <!-- 设置一个滚动元素 -->
            <div :style="{height: items.length * size + 'px', width: '100%'}"></div>
            <div id="container" ref="container" :style="{ top: offsetTop }">
                <div
                    v-for="(item, i) in itemList"
                    :key="i"
                    class="item"
                    :style="{height: size + 'px'}"
                >{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        items:{
            type: Array,
            default: []
        },
        remain: { // 显示条数
            type: Number,
            default: 7
        },
        size: { // 每条数据的高度
            type: Number,
            default: 30
        }
    },
    computed: {
        // 利用计算属性获取页面真实要展示的数据数量
        itemList: function() {
            return this.items.slice(this.start, this.end)
        }
    },
    data() {
        return {
            start: 0,
            end: this.remain,
            offsetTop: 0
        }
    },
    mounted(){
        // 设置父元素的高度 每行的高度 * 要显示的条数 或者屏幕高度(可以根据需求计算)
        //  document.documentElement.clientHeight + 'px'
        this.$refs.VirtualList.style.height = this.size * this.remain + "px";
        this.fin()
        console.log('this.changeTotree()',this.changeTotree())
    },
    methods: {
        handleScroll() {
            // 从第几个item开始
            this.start = this.$refs.VirtualList.scrollTop / this.size
            // 开始位置+要显示几个 = end
            this.end = this.start + this.remain
            // console.log('start:',this.start, 'emd:', this.end)
            // 动态更改定位的top值，保证不会随父元素一同滚动
            this.offsetTop = this.$refs.VirtualList.scrollTop + 'px'
        },
        // 大致思路
        // 1.由于虚拟列表只显示视口的数据，所以不会显示出滚动条，那么我们需要造一个滚动条。
        // 2.造出滚动条之后元素就会被挤到下面 我们需要设置一个相对于父元素的定位。
        // 3.由于设置了定位，当父元素滚动的时候，设置了定位的子元素会相对应的移动，那么我们需要在滚动的时候给子元素动态的设置top的值
        // 4.获取到数据之后，需要根据视口来筛选要显示的数据
        
        // 获取数组中出现次数最多和最少的值
        fin(){
        
            let arr=[2,4,1,4,2,4,5,3,3,1,5,4,4,5,6];
            let number=[...new Set(arr)];// 记录一共有几个不重复的数组项
            console.log('number',number)
            let arrstr=arr.join("");//原数组的拼接字符串，用于查找每项出现的次数。 
            console.log('arrstr',arrstr, arrstr.split(number[0]).length-1)
            let countarr=[];// 记录每一个不重复的项 各出现了几次
            for(let i=0;i<number.length;i++){
                let count=arrstr.split(number[i]).length-1;//有几个这个数就会分成次数+1个项
                countarr.push(count);
            }
            console.log('countarr',countarr, Math.max.apply(null,countarr))
            //    获取countarr中最大的数且获取它的下标，再通过这个下标获取number对应的值
            let max = number[countarr.indexOf(Math.max.apply(null,countarr))]
            let min = number[countarr.indexOf(Math.min.apply(null,countarr))]
            console.log(max ,"出现次数最多的")        
            console.log(min ,"出现次数最少的")
            // let reg = new RegExp(max, 'g')
            console.log(arr.filter(item => item != max))
            console.log('reg',arr)
        },

        changeTotree(){
            let data = [
                { id: "01", name: "张大大", pid: "", job: "项目经理" },
                { id: "02", name: "小亮", pid: "01", job: "产品leader" },
                { id: "03", name: "小丽", pid: "02", job: "产品经理" },
                { id: "04", name: "大光", pid: "02", job: "产品经理" },
            ]
            // if(!Array.isArray(data)) return data
            let nData = JSON.parse(JSON.stringify(data))
            let result = []
            let map = {}
            nData.forEach(ele => {
                map[ele.id] = ele
            })
            console.log('map',map)
            nData.forEach(item => {
                let parent = map[item.pid]
                console.log('parent',parent)
                if(parent) {
                    // 判断 parent 里有无children 如果没有则创建 如果有则直接把 item push到children里
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    // 如果map[item.pid] 没有值则表示此item为第一级
                    result.push(item)
                }
            })
            console.log('result',result, map)
            return result
        }
        
    }
}
</script>
<style lang="scss" scoped>
#VirtualList{
    overflow: auto;
    width: 100%;
    position: relative;
}
#container {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.item {

  line-height: 80px;
  padding-left: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
}
</style>