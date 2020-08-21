<template>
    <div class="input_box" v-if="!isHidden">
        <div class="input_label" :style="{width:labelWidth + 'px'}">{{label}}</div>
        <div class="input_center">
            <div class="input_dised_val" v-if="disabled">{{priValue}}</div>
            <div class="input_value_box" v-else>
                <input
                    type="text"
                    :placeholder="placeholder"
                    :maxlength="maxlength"
                    v-model="priValue"
                    @focus="Onfocus"
                    @blur="Onblur"
                />
            </div>
        </div>
        <!-- 用法参考routerTst组件中的引用 -->
    </div>
</template>
<script>
export default {
    name: "Hinput",
    props: {
        label: {
            // 标题
            type: String,
            default: ""
        },
        labelWidth: {
            // 标题宽度
            type: Number,
            default: 80
        },
        isHidden: {
            // 是否隐藏组件
            type: Boolean,
            default: false
        },
        disabled: {
            // 是否允许输入
            type: Boolean,
            default: false
        },
        placeholder: {
            // 提示文字
            type: String,
            default: ""
        },
        maxlength: {
            // 允许最多字数
            type: Number,
            default: 30
        },
        value: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            priValue: ""
        };
    },
    methods: {
        // 获取焦点
        Onfocus() {
            this.$emit("Onfocus", this.priValue);
        },
        // 失去焦点
        Onblur() {
            this.$emit("Onblur", this.priValue);
        }
    },
    mounted() {
        this.priValue = this.value;
    },
    watch: {
        value(val) {
            this.priValue = val;
        },
        priValue(val) {
            this.$emit("input", val);
            this.$emit("change", val); // 改变事件
        }
    }
};
</script>
<style lang="scss" scoped>
.input_box {
    width: 100%;
    height: 46px;
    font-size: 14px;
    line-height: 46px;
    display: flex;
    padding: 0 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
    background: #ffffff;
    .input_label {
        width: 80px;
        height: 100%;
        font-size: #333333;
    }
    .input_center {
        flex: 1;
        display: flex;
        position: relative;
        overflow: hidden;
        .input_dised_val {
            flex: 1;
            color: #666666;
            padding: 0 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .input_value_box {
            flex: 1;
            color: #666666;
            padding: 0 10px;
            display: flex;
            input {
                flex: 1;
                font-size: 14px;
            }
        }
    }
}
</style>
