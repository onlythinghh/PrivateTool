<template>
    <div class="select-box" v-if="!isHidden">
        <div class="select-main" @click.stop="onClickSel">
            <div class="select-label" :style="{width:labelWidth + 'px'}">{{label}}</div>
            <div class="select-canter">
                <span class="sel-value" v-if="!disabled&&!HvalText">{{placeholder}}</span>
                <span class="sel-value" v-else>{{HvalText}}</span>
            </div>
        </div>
        <popSelect v-if="!other" :single="single" :value="Hvalue" v-model="Hvalue" :gather="gather" ref="popSelect"></popSelect>
    </div>
</template>
<script>
import popSelect from '../../popSelect/src/main'
export default {
    name: "Hselect",
    props: {
        label: {
            type: String, // 标题
            default: ""
        },
        labelWidth: {
            type: Number, // 标题宽度
            default: 70
        },
        isHidden: {
            type: Boolean, // 是否隐藏组件
            default: false
        },
        disabled: {
            type: Boolean, // 是否可操作
            default: false
        },
        placeholder: {
            // 提示文字
            type: String,
            default: ""
        },
        value:{ // 选中值
            type: Array,
            default: () => []
        },
        gather: {
            type: Array,
            default: () => []
        },
        single:{ // 是否单选，false为多选
            type: Boolean,
            default: false
        },
        onClick: { // 其他点击事件
            type: Function,
            default: () => {}
        },
        other:{
            type: Boolean, // 是否允许默认（自定义的）下拉弹窗， true:自定义事件， false:打开多选弹窗
            default: false
        }
    },
    data() {
        return {
            Hvalue: [],
            HvalText:'' // 选中值 显示用
        };
    },
    methods:{
        onClickSel () { // 打开选项弹窗()
            if(this.disabled) return false;
            if(this.other) {
                this.onClick();
            } else {
                console.log('123123')
                this.$refs["popSelect"].onOpenSelect(); // 执行子组件（多选框）的事件
            }
        }
    },
    watch:{
        value(newValue){
            this.Hvalue = newValue
        },
        Hvalue(val) {
            console.log('val', val)
            this.HvalText = val.map(item =>{
                const {label} = item;
                return label
            }).join(",")
        }
    }
};
</script>
<style lang="scss" scoped>
.select-box {
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding: 0 10px;
    line-height: 46px;
    background: #ffffff;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    .select-main {
        width: 100%;
        height: 100%;
        display: flex;
        .select-label {
            width: 70px;
            height: 100%;
        }
        .select-canter {
            flex: 1;
            color: #666666;
            padding: 0 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            position: relative;
            &::after{
                content: "";
                width:8px;
                height: 8px;
                border: 2px solid #cccccc;
                border-left: 0;
                border-bottom: 0;
                position: absolute;
                right: 2px;
                top: 50%;
                transform: translate(0, -50%) rotate(45deg);
            }
        }
    }
}
</style>