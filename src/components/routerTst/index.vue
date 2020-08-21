<template>
    <div id="routerWeb">
        <h1>使用动态路由</h1>
        <!-- 使用路由 -->
        <span v-for="web in webs" :key="web.name">
            <router-link :to="'/rutTst/' + web.url">{{web.name}}</router-link>
            <br />
        </span>
         <!-- 使用路由 END -->
        <p @click="$refs.keyboard.open()">点击显示软键盘</p>  <!-- 测试软键盘 -->
        <input class="input" type="text" v-model="money" /> <!-- 测试软键盘  end-->
        <!-- input 组件 -->
        <div class="tinput">
                <Hinput
                :label="iptdata.label"
                :labelWidth="iptdata.labelWidth"
                v-model="iptdata.value"
                :isHidden="iptdata.isHidden"
                :disabled="iptdata.disabled"
                :placeholder="iptdata.placeholder"
                :maxlength="iptdata.maxlength"
                @Onfocus="onFocus"
                @Onblur="onBlur"
                @change="changes"
            ></Hinput>
        </div>
        <!-- input 组件 END -->
        <div class="selecrt">
            <Hselect
                :label="seldata.label"
                :labelWidth="seldata.labelWidth"
                :isHidden="seldata.isHidden"
                :disabled="seldata.disabled"
                :placeholder="seldata.placeholder"
                :value="seldata.value"
                :single="seldata.single"
                :onClick="SelClick"
                :other="seldata.other"
                :gather="seldata.gather"
            ></Hselect>
        </div>
        <!-- 软键盘 组件 -->
        <keyBoard
            :value.sync="money"
            visible.sync="visible"
            :radiPoint.sync="radiPoint"
            :maxlength.sync="maxlength"
            ref="keyboard"
        ></keyBoard>
        <!-- 软键盘 组件 END-->
        <div class="toast" @click="showtoast">显示提示</div>
        <div class="loading" @click="OnclickLoading">显示Loading</div>
        <div class="testReg" @click="testReg">测试正则工具</div>
        <!-- 路由渲染 -->
        <router-view />
    </div>
</template>
<script>
import { Regular } from '../../tools/index'
export default {
    data() {
        return {
            webs: [
                { url: "www.1.com", name: "百度" },
                { url: "www.2.com", name: "阿里巴巴" },
                { url: "www.3.com", name: "腾讯" }
            ],
            money: "", // 金额
            visible: false,
            radiPoint: 4, // 允许小数点后几位
            maxlength: 5, // 允许整数位最大位数
            iptdata: {  // input组件测试数据
                label: "姓名",
                labelWidth: 100,
                value: "lalal",
                isHidden: false,
                disabled: false,
                placeholder: "试着输入点什么",
                maxlength: 20
            },
            seldata:{
                label: "选择标题",
                labelWidth: 100,
                isHidden: false,
                disabled: false,
                placeholder: "试着输入点什么",
                value:[],
                gather: [
                    { label: "无", value: "999", isBanOther: true },
                    { label: "手机充值", value: "1" },
                    { label: "生活缴费", value: "2" },
                    { label: "快递收寄", value: "3" },
                    { label: "文印", value: "4" },
                    { label: "报刊邮品", value: "5" },
                    { label: "彩票", value: "6" },
                    { label: "交通代订", value: "7" },
                    { label: "酒店代订", value: "8" },
                    { label: "旅游服务", value: "9" },
                    { label: "劳务中介", value: "10" },
                    { label: "金融服务", value: "11" },
                    { label: "三农产品服务", value: "12" },
                    { label: "积分兑换", value: "13" }
                ],
                single: false,
                other: false,
            },
        };
    },
    mounted(){
    },
    methods: {
        beforeRouteUpdate(to, from, next) {
            console.log("to", to);
            console.log("from", from);
            console.log("next", next);
            next();
        },
        // input 组件的事件测试
        onFocus(val) {
            console.log("获取焦点", val);
        },
        onBlur(val) {
            console.log("失去焦点", val);
        },
        changes(val) {
            console.log("改变事件", val);
        },
        // input 组件的事件测试 END

        // select 组件的事件测试
        SelClick() {
            console.log('select事件测试')
        },

        // 显示toast组件
        showtoast() {
            this.$toast({message: "提示文字",timeout: 1000, position: 'top'})
        },
        // 测试loading组件
        OnclickLoading() {
            // this.$loading({message:'加载中...', mask: false})
            this.$loading('加载中...')
            setTimeout(() => {
                this.$closeLoading()
            }, 3000);
        },

        testReg() {
            let tel = this.money;
            // let res = Regular.match('phone',tel)
            let res = Regular.test('money', tel)
            console.log('res',res)
        }
    },
    watch: {
        // money(newVal){
        //         if (/\./.test(newVal) && newVal.split('.')[1].length === 0) {
        //         newVal = newVal.split('.')[0]
        //     }
        // },

        $route(to, from) {
            console.log("watch to:", to);
            console.log("watch from:", from);
        }
    }
};
</script>
<style lang="scss" scoped>
.tinput{
    height: 50px;
    width: 100%;
    padding: 10px 0;
    background: sandybrown;
}
.input {
    border: 1px solid #ccc;
}
.selecrt{
    height: 50px;
    width: 100%;
    padding: 10px 0;
    background: red;
}
</style>
