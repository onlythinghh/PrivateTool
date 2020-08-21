<template>
    <div class="ui-keyboard" :class="{'show':visible}">
        <!-- 这是input插件 -->
        <div class="keyboard" @touchstart.prevent>
            <!--@touchstart.prevent 阻止移动端与click事件的冲突-->
            <div class="key_left">
                <div class="key_numbers">
                    <!-- 1-9 -->
                    <ul>
                        <li v-for="(item, index) in new Array(9)" :key="index">
                            <div
                                class="item"
                                @touchstart="startFn($event)"
                                @touchend="endFn($event, index+1)"
                            >{{index+1}}</div>
                        </li>
                    </ul>
                </div>
                <div class="key_symbol">
                    <!-- . 0 隐藏 -->
                    <ul>
                        <li v-for="(item, index) in symbols" :key="index">
                            <div
                                class="item"
                                :class="item.icon ? item.icon : '' "
                                @touchstart="startFn($event)"
                                @touchend="endFn($event, item.label)"
                            >{{item.value}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="key_right">
                <!-- 删除和完成键-->
                <div class="key_del">
                    <div
                        class="item icon-delete"
                        @touchstart="startFn($event)"
                        @touchend="endFn($event, 'del')"
                    ></div>
                </div>
                <div class="key_comt">
                    <div
                        class="item"
                        @touchstart="startFn($event)"
                        @touchend="endFn($event, 'ok')"
                    >完成</div>
                </div>
            </div>
        </div>
        <!-- 用法： 具体可参考routerTst组件中的用法
            全局注册后直接在父组件中使用：
            <keyBoard :value.sync="money" visible.sync="visible" :radiPoint.sync="radiPoint" :maxlength.sync="maxlength" ref="keyboard"></keyBoard>
            value: 输入的值， visible：是否显示键盘，  radiPoint：小数点后几位，  maxlength：最大整数
            ref="keyboard"： 显示键盘时，在父组件中调用$refs.keyboard.open()
            .sync：修饰符，子组件发生变化是父组件发生相应变化（exp: this.$emit("update:value", tempVal)）
         -->
    </div>
</template>
<script>
export default {
    name: "keyBoard", // 这里需要注意下，我们是采用的全局注入我们的组件，所以在后面因为我们的组件后，会直接使用这个命名的标签
    props: {
        value: {
            // 输入值
            type: String,
            default: ""
        },
        radiPoint: {
            // 小数点后几位
            type: Number,
            default: 2
        },
        maxlength: {
            // 最大整数位长度
            type: Number,
            default: 6
        }
    },
    data() {
        return {
            symbols: [
                // . 0 ''
                { label: ".", value: "." },
                { label: 0, value: 0 },
                { label: "down", value: "", icon: "icon-board-down" }
            ],
            visible: false // 是否隐藏键盘
        };
    },
    components: {},
    methods: {
        startFn(e) {
            // 手指按下触发
            e.target.style.backgroundColor = "e2e2e2";
        },
        endFn(e, data) {
            //手指抬起触发
            e.target.style.backgroundColor = "#fff";
            console.log("data", data);
            if (data == "ok" || data == "down") {
                this.close();
            } else if (data == "del") {
                let tempVal = this.value.substr(0, this.value.length - 1);
                this.$emit("update:value", tempVal);
            } else {
                let value = this.value,
                    tempval = this.value;
                const len = tempval.length;
                if (/\./.test(tempval)) {
                    // 是否含有小数点
                    data = data === "." ? "" : data;
                    const arr = tempval.split(".")[1];
                    if (arr.length >= this.radiPoint) {
                        // 判断小数点后的长度
                        data = "";
                    }
                } else {
                    if (len >= this.maxlength && data !== ".") {
                        // 限制整数位最大长度
                        data = "";
                    } else if (tempval == "" && data === ".") {
                        // 如果第一位数输入的是 . 就显示 0.
                        value = "0";
                    } else if (tempval === "0" && data !== ".") {
                        // 如果第一位数是0 则下一位只能输入小数点
                        data = "";
                    }
                }
                // let num = data.toString()
                this.$emit("update:value", value + "" + data);
            }
        },
        // 显示键盘
        open() {
            this.visible = true;
            this.$emit("update:visible", this.visible);
        },
        // 隐藏键盘
        close() {
            this.visible = false;
            this.$emit("update:visible", this.visible);
        }
    }
};
</script>

<style lang="scss">
.ui-keyboard {
    overflow: hidden;
    background-color: #f5f5f5;
    height: 250px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    padding: 7px;
    transform: translateY(110%);
    box-shadow: 0 0 1px 1px #f0f0f0;
    transition: transform 0.2s cubic-bezier(0.09, 0.87, 1, 1);
    &.show{
        transform: translateY(0);
    }
    .keyboard {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #f1f1f1;
        display: flex;
        font-weight: 500;
        color: #333;
        font-family: PingFangSC, "微软雅黑";
        .key_left {
            width: 75%;
            display: flex;
            flex-direction: column;
            .key_numbers {
                flex: 3;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    height: 100%;
                    width: 100%;
                    li {
                        width: 33%;
                        height: 33%;
                        box-sizing: border-box;
                        padding-right: 7px;
                        padding-bottom: 7px;
                        .item {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 5px;
                            background: #ffffff;
                        }
                    }
                }
            }
            .key_symbol {
                flex: 1;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    height: 100%;
                    width: 100%;
                    li {
                        width: 33%;
                        height: 100%;
                        box-sizing: border-box;
                        padding-right: 7px;
                        padding-bottom: 7px;
                        .item {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            border-radius: 5px;
                            background-color: #ffffff;
                            &.icon-board-down {
                                background: url("./img/icon-hide.png") no-repeat
                                    center / 24px 24px;
                                background-color: #ffffff;
                            }
                        }
                    }
                }
            }
        }
        .key_right {
            flex: 1;
            flex-direction: column;
            display: flex;
            .key_del,
            .key_comt {
                flex: 1;
                justify-content: center;
                align-items: center;
                padding-bottom: 7px;
                .item {
                    height: 100%;
                    width: 100%;
                    font-size: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 5px;
                    background-color: #ffffff;
                    &.icon-delete {
                        background: url("./img/icon-del.png") no-repeat center /
                            32px 32px;
                        background-color: #ffffff;
                    }
                }
            }
            // .key_comt{
            // }
        }
    }
    .number-show {
        height: 20px;
    }
    .number-panel ul {
        padding: 0;
    }
}
</style>