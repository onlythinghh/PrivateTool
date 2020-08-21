<template>
    <div class="Loadmore">
        <div class="loadbox" ref="wrapper">
            <div class="bscroll-contenr">
                <div class="load-top">
                    <span class="toptip">{{toptext}}</span>
                </div>
                <ul class="center">
                    <li v-for="(item, index) in list" :key="index">{{item}}</li>
                </ul>
                <div class="load-bottom">
                    <span class="bottomtip">{{bottomtxt}}</span>
                </div>
            </div>
        </div>
        <div class="alert-hook" v-show="alerthook">刷新成功</div>
        <div class="backtop" @click="gotop" v-show="backtop">^</div>
    </div>
</template>

<script>
// Better-scroll
import BScroll from "better-scroll";
export default {
    data() {
        return {
            list:[1,2,3,4,5,6,7,8,9,10],
            wrapperHeight: "0", // 容器高度
            toptext: "下拉刷新",
            bottomtxt: "上拉加载",
            alerthook: false,
            backtop: false
        };
    },
    mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                scrollY: true,
                pullUpLoad: {
                    probeType: 1,
                    threshold: -30    //当上拉距离超过盒子高度的10px的时候,就派发一个上拉加载的事件
                },
                pullDownRefresh:{
                    probeType: 1,
                    threshold: 30
                }
            })
            // 上拉加载
            this.scroll.on('pullingUp', ()=>{
                // console.log('22222222')
                this.bottomtxt = "加载中。。。",
                this.getpullup()
            })

            //下拉加载
            this.scroll.on('pullingDown', ()=>{
                // console.log('11111',pos)
                this.toptext = '加载中...'
                this.pulldown();
                
            })
            this.scroll.on('scroll', (ev) => {
                // console.log('scrollY',Math.floor(ev.y))
                // if(Math.floor(ev.y) > 30) {
                //     this.toptext= "释放刷新1"
                // }
                if(ev.y < (-100)) {
                    this.backtop = true
                }
            })
    },
    methods: {
        getData() {
            return new Promise(resolve => {
                let lastnum = this.list.length;
                setTimeout(() => {
                    const arr = [];
                    for (let i = 0; i < 5; i++) {
                        arr.push(lastnum++);
                    }
                    resolve(arr);
                }, 1000);
            });
        },
        // 下拉获取数据
        pulldown(){
            setTimeout(() => {
                this.toptext = '刷新成功'
                this.getData().then(result => {
                    this.list = this.list.concat(result)
                    this.refreshalert()
                    this.scroll.finishPullDown() // DOM 结构发生变化后，重新初始化BScroll
                    this.scroll.refresh();
                }).then(()=>{
                    this.toptext = '下拉刷新'
                })
            }, 1500);
        },
        // 上拉获取数据
        getpullup() {
            console.log('上拉加载')
            setTimeout(() => {
                this.bottomtxt = '加载成功'
                this.getData().then(result => {
                    this.list = this.list.concat(result)
                    this.scroll.finishPullUp();
                    this.scroll.refresh();
                }).then(()=>{
                    this.bottomtxt = '上拉加载2'
                })
            }, 1500);
        },

        // 刷新成功提示
        refreshalert() {
            //    this.$toast({message: "刷新成功",timeout: 1000})
            this.alerthook = true;
            setTimeout(() => {
                this.alerthook = false;
            }, 2000);
        },
        gotop(pos) {
            this.scroll.scrollTo(0,0, 600)
        }
    },
    created() {
        
    }
};
</script>
<style lang="scss" scoped>
.Loadmore {
    height: 100%;
    font-size: 14px;

    .loadbox {
        width: 100%;
        height: 300px;
        background: #ccc;
        overflow: hidden;
        position: relative;
        .bscroll-contenr {
            .load-top {
                position: absolute;
                top: -40px;
                left: 0;
                z-index: 1;
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #555;
            }
            .center {
                li {
                    line-height: 50px;
                    border-bottom: 1px solid #ccc;
                    text-align: center;
                }
            }
            .load-bottom {
                width: 100%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: rgb(223, 217, 217);
                background: #f2f2f2;
                // position: absolute;
                // bottom: -40px;
                // left: 0;
                // z-index: 1;
            }
        }
    }
    .alert-hook {
        position: fixed;
        top: 62px;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background: rgba(7, 17, 27, 0.5);
    }
    .backtop{
        position: fixed;
        bottom: 50px;
        right: 30px;
        width: 40px;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 20px;
    }
}
</style>

