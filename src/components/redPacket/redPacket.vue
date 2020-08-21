<template>
    <div class="redPacket">
        <div class="ser_home">
            <ul class="red_packet" id="red_packet">
                <li
                    v-for="(item, index) in liParams"
                    :style="{ left: item.left, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
                    :class="item.cls"
                    :data-index="index"
                    @webkitAnimationEnd="removeDom"
                    :key="index"
                    @click="getmun($event, index)"
                >
                    <a href="javascript:;">
                        <i ref="item"
                            :class="[item.bgImg, {'bowq':isclick&&mumber===index}]"
                            :style="{background: item.bgImg, transform: item.transforms, webkitTransform: item.transforms}"
                        ></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            liParams: [],
            timer: null,
            duration: 10000, // 定义时间
            clicknum: 0,
            isclick: false,
            mumber:0,
        };
    },
    mounted() {
        this.startRedPacket();
    },
    methods: {
        startRedPacket() {
            let win =
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            let left = parseInt(Math.random() * (win - 50) + 0);
            let rotate = parseInt(Math.random() * (45 - -45) - 45) + "deg"; // 旋转角度
            let scales = (Math.random() * (12 - 8 + 1) + 8) * 0.1; // 图片尺寸
            let durTime = Math.random() * (5.5 - 1.2 + 1) + 1.2 + "s"; // 时间  1.2和1.2这个数值保持一样
            let imgarr = ["red_one","red_two","red_three"] // 随机红包样式
            let tmpbg = imgarr[Math.floor((Math.random()*imgarr.length))];
            // console.log(durTime);
            this.liParams.push({
                left: left + "px",
                cls: "move_1",
                transforms: "rotate(" + rotate + ") scale(" + scales + ")",
                durTime: durTime,
                bgImg: tmpbg
            });
            setTimeout(() => {
                // 多少时间结束
                clearTimeout(this.timer);
                return;
            }, this.duration);
            this.timer = setTimeout(() => {
                this.startRedPacket();
                console.log('111')
            }, 100);
        },
        // 回收dom节点
        removeDom(e) {
            let target = e.currentTarget;
            // console.log('target',target)
            document.querySelector("#red_packet").removeChild(target);
        },
        getmun(ev, idx){
            this.clicknum = this.clicknum + 1;
            // this.isclick = true;
            // this.$refs.classList.add('className')
            let addcls = this.$refs.item[idx];
            addcls.classList.add('bow');
            // this.$refs.item[idx].classList.add('className');
            this.mumber = idx;
             let target = ev.currentTarget;
            setTimeout(() => {
                // this.isclick = false;
                document.querySelector("#red_packet").removeChild(target);
            }, 800);
            if(this.clicknum == 3){
                clearTimeout(this.timer);
            }
            console.log("this.clicknum",this.clicknum)
        }
    },
    components: {}
};
</script>
<style lang="scss" scoped>
.redPacket {
    width: 100%;
    height: 100%;
    .ser_home {
        width: 100%;
        height: 100%;
    }
    .red_packet {
        display: block;
        position: relative;
        overflow: hidden;
        background: #ccc;
        width: 100%;
        height: 100%;
        i {
            width: 48px;
            height: 69px;
            display: block;
            // background: url("./img/hongbao.png") no-repeat;
            &.red_one{
                background: url("./img/red_one.png") no-repeat;
            }
            &.red_two{
                background: url("./img/red_two.png") no-repeat;
            }
            &.red_three{
                background: url("./img/red_three.png") no-repeat;
            }
            background-size: 100%;
            &.bow{
                background: url('./img/hby_img_band.gif') no-repeat;
                background-size: 100%;
            }
        }
        li {
            position: absolute;
            animation: all 3s linear;
            top: -100px;
            z-index: 10;
            &.move_1 {
                -webkit-animation: aim_move 7s linear 1 forwards;
                animation: aim_move 7s linear 1 forwards;
            }
        }
        a {
            display: block;
        }
    }
    @keyframes aim_move {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        100% {
            -webkit-transform: translateY(120vh);
            transform: translateY(120vh);
        }
    }
}
</style>
