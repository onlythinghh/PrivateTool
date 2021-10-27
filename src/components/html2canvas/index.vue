<!--
 * @Description: 
 * @Author: hzh
 * @Date: 2021-07-08 13:54:53
 * @FilePath: \PrivateTool\src\components\html2canvas\index.vue
-->
<template>
  <div class="yzgPoster">
    <img v-if="imgUrl" :src="imgUrl" alt="" width="100%">
    <div v-else class="box" ref="box">
        <img class="bg" :src="`data:image/png;base64,${qrCodeImg}`" width="100%" alt="">
      <img class="bg" src="../../assets/img/yzgposter_bg.png" width="100%" height="100%" alt="">
      <img class="qrcode" :src="`data:image/png;base64,${qrCodeImg}`" alt="" >
      <div class="userInfo">
        <p class="name">{{villageDecca}}</p>
        <p class="num" v-if="taiKaCode">NO.{{taiKaCode}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      title:'掌柜码',
      qrCodeImg: require('../../assets/img/123.png'), // 二维码，应该从接口获取
      villageDecca: '测试店铺名称',
      taiKaCode: '1231231',
      imgUrl: '', // 生成后的图片
    }
  },
  mounted() {
    this.getqrCodeImg(() => {
      this.draw()
    })
  },
  methods:{
    getqrCodeImg(){
      callback&&callback()

      // 调用接口获取相关数据，获取到数据后调用回调函数执行draw方法
    //  const [err, res] = await this.$to(this.$api.getPayQrCode())
    //   if(err) {
    //     console.log('获取权限接口出错', err)
    //     return
    //   }
    //   const { returnCode, logoQRCode, villageDecca, taiKaCode, returnMsg } = res
    //   if(returnCode === '0000') {
    //     this.qrCodeImg = logoQRCode
    //     this.villageDecca = villageDecca
    //     this.taiKaCode = taiKaCode
    //     callback&&callback()
    //   } else {
    //     this.$toast(returnMsg)
    //   }
    },

    // 使用html2canvas插件对$refs.box绘制成图片
    draw(){
      let _that = this;
      setTimeout(function() {
      html2canvas(_that.$refs.box).then(function(canvas) {
        _that.imgUrl = canvas.toDataURL()//将canvas转为base64图片(eg. data:image/png;base64,ijskjlkj)
      });
      }, 20)
    },
  }
}
</script>
<style lang="less" scoped>
.yzgPoster{
  width: 100%;
  height: 100%;
  background: #FEC38F;
  .box{
    width: 100%;
    height: 100%;
    position: relative;
    .qrcode{
      width: 140px;
      height: 140px;
      position: absolute;
      left: 50%;
      bottom: 23%;
      // top: 45.4%
      transform: translateX(-50%);
    }
    .userInfo{
      width: 200px;
      position: absolute;
      left: 50%;
      bottom: 15%;
      // top: 67.5%;
      transform: translateX(-50%);
      color: #C54000;
      text-align: center;
      .name{
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        font-weight: bold;
      }
      .num{
        font-size: 13px;
      }
    }
  }
}
</style>