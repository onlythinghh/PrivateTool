<template>
    <div class="qrcode">
        <!--插件  https://www.npmjs.com/package/qrcode#options 
                https://github.com/soldair/node-qrcode#tocanvascanvas-text-options-cberror
        -->
        <p>二维码: {{newtime}}</p>
        <canvas id="canvas" ref="canvas"></canvas>
        <div class="http" @click="testSever">接口测试</div>
    </div>
</template>

<script>
import QRCode from 'qrcode';
import {Product, getList2} from './../../sever/api';
const _Product = new Product();
export default {
    data() {
        return {
            newtime:''
        }
    },
    mounted() {
        this.useqrcode();
        // 每n秒刷新一次
        window.setInterval(() => {
            this.useqrcode()
        },6000)
    },
    methods:{
        useqrcode() {
            let date= new Date().getTime();
            this.newtime = date || ''
            // console.log(date) https://www.baidu.com/s?
            QRCode.toCanvas(this.$refs.canvas, "word=flex%3A0+0+100px%3B&tn=02003390_7_hao_pg&time="+date+"",{
                width: 180,
                height: 180,
                // margin:1,
                errorCorrectionLevel: 'H'   // 容错等级L:7% M:15% Q:25% H:30%
            }, function(error){
                if(error) {
                    console.log('err:',error)
                } else {
                    console.log('QRCode success!');
                }
            })
        },
        testSever() {
            _Product.getList1().then(res => {
                console.log('res', res)
            })
            // exp2
            // getList2().then( res => {
            //     console.log('res2',res)
            // })
        }
         
    }
}
</script>

<style lang="scss" scoped>
.qrcode{
    height: 100%;
    width: 100%;
}
</style>


