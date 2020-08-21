<template>
    <transition name="fade">
        <div class="popSelect-box" @touchmove.prevent v-if="visible">
            <div class="pop-select-bg" @click.stop="onCloseSelect"></div>
            <div class="pop-select-center">
                <div class="pop-select-header">
                    <div class="cancel" @click.stop="onCloseSelect">取消</div>
                    <div class="title">
                        {{title}}
                        <span class="is-multiple" v-if="!single">(可多选)</span>
                    </div>
                    <div class="confirm"  @click="onCheck">确定</div>
                </div>
                <div class="scoll-wrapper-gather">
                    <ul>
                        <li
                            class="select-item"
                            v-for="(item, index) in HGather"
                            :key="index"
                            :class="{'on':item.checked}"
                            @click="onEvent(item)"
                        >
                            <div class="item-label">{{item.label}}</div>
                            <div class="item-checkbox"><span></span></div>
                        </li>
                        <li class="select-item-size"></li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: "popSelect",
    data() {
        return {
            visible: false,
            HScroll: null, // 滚动条
            HGather: [], // 选项数据
        };
    },
    props: {
        value: {
            type: Array,
            default: () => []
        },
        gather: {
            type: Array,
            default: () => []
        },
        single: {
            // 是否多选， false为多选
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "请选择"
        }
    },
    methods: {
        getCheckItem() {
            return this.HGather.filter(item => item.checked);
        },
        onChange(currItem) {
            const { value, isBanOther } = currItem;
            if(isBanOther){
                this.HGather.map(gatherItem => {
                    gatherItem.checked = false;
                })
                currItem.checked = true;
            } else {
                currItem.checked = true;
            }
        },
        onCheck() {
            this.onCloseSelect();
            const checkItem = this.getCheckItem();
            this.$emit("input", checkItem); // 发送选中的数据（父组件通过v-model监听值的变化）
        },
        onCloseSelect() {
            this.visible = false;
        },
        onOpenSelect() {
            this.visible = true;
        },
        onEvent(currItem) {
            console.log("currItem", currItem);
            const {checked, isBanOther} = currItem;
            this.HGather.map(gatitem => {
                if(this.single) {
                    if(gatitem.value != currItem.value) {
                        gatitem.checked = false;
                    }
                } else{
                    if(isBanOther) {
                        if(!gatitem.isBanOther){
                            gatitem.checked = false;
                        }
                    } else {
                        if(gatitem.isBanOther){
                            gatitem.checked = false;
                        }
                    }
                }
            })
            currItem.checked = !currItem.checked;
            this.HGather = JSON.parse(JSON.stringify(this.HGather));
        },
        // 初始化数据中是否有选中的选项
        getDefaultCheckItem() {
            console.log("this.gather", this.gather);
            const Gather = JSON.parse(JSON.stringify(this.gather));
            return Gather.map(gatItem => {
                this.value.map(valItem => {
                    if (gatItem.value == valItem.value) {
                        gatItem.checked = true;
                    }
                });
                return gatItem;
            });
        },
        init() {
            this.HGather = this.getDefaultCheckItem();
            this.HScroll = new IScroll(".scoll-wrapper-gather", {
                scrollY: true,
                preventDefault: false
            });
        }
    },
    updated(){
        if(this.HScroll) {
            this.HScroll.refresh();
        }
    },
    watch: {
        visible(newValue) {
            if (newValue) {
                setTimeout(this.init);
            } else {
                this.HScroll = null;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.popSelect-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .pop-select-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background: rgba($color: #000000, $alpha: 0.2);
    }

    .pop-select-center {
        width: 100%;
        height: 300px;
        bottom: 0;
        left: 0;
        position: absolute;
        z-index: 10;
        background: #ffffff;
        .pop-select-header {
            height: 50px;
            display: flex;
            font-size: 16px;
            border-bottom: 1px solid #eeeeee;
            .cancel {
                padding: 0 15px;
                color: #999999;
            }
            .title {
                flex: 1;
                color: #333333;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                .is-multiple {
                    color: #999999;
                }
            }
            .confirm {
                padding: 0 15px;
                color: #f03b3b;
            }
        }
        .scoll-wrapper-gather{
            max-height: 260px;
            overflow: hidden;
            ul{
                .select-item{
                    height: 45px;
                    line-height: 45px;
                    display: flex;
                    padding: 0 15px;
                    border-bottom:1px solid #eeeeee;
                    &.select-item-size {
                        height: 16px;
                    }
                    .item-label{
                        flex: 1;
                        font-size: 16px;
                        color: #666666;
                    }
                    .item-checkbox{
                        display: flex;
                        align-items: center;
                        span{
                            border: 1px solid #cccccc;
                            background-color: #ffffff;
                            width: 20px;
                            height: 20px;
                            border-radius: 4px;
                            display: inline-block;
                            position: relative;
                            transition: all 0.2s;
                            transform-origin: center center;
                            &::after{
                                transform: rotate(45deg) scale(0);
                            }
                            
                        }
                    }
                    &.on{
                        .item-checkbox{
                            span{
                                border: 1px solid #f03b3b;
                                background-color: #f03b3b;
                                &::after{
                                    width: 4px;
                                    height: 8px;
                                    content: " ";
                                    position: absolute;
                                    top: 3px;
                                    left: 7px;
                                    border: 2px solid #ffffff;
                                    border-left: 0;
                                    border-top: 0;
                                    transition: all 0.3s;
                                    transform: rotate(45deg) scale(1)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>