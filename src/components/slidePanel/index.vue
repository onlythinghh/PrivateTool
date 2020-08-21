<template>
  <div class="conte">
    <div class="box">
      <p ref="myWidth" class="width" v-show="show">111{{ msg }}</p>
      <div :class="{'on':show}" class="erweima">
        <div class="btn" href @click="clickhandel">123123{{msg}}</div>
        <div class="item">开讲啦肯德基拉开数据了</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      msg: "默认",
      txt: "1",
    };
  },
  methods: {
    clickhandel() {
      this.show = !this.show;
      // 此时获取不到dom的属性
      // this.msg = this.$refs.myWidth.offsetWidth
      // $nextTick()
      this.$nextTick(() => {
        this.msg = this.$refs.myWidth.offsetWidth;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.conte {
  font-size: 14px;
  background: red;
  .box {
    width: 100%;
    background: salmon;
    position: absolute;
    bottom: 0px;
    .width {
      text-align: right;
    }
  }
  .erweima {
    position: fixed;
    width: 100px;
    height: 100px;
    background: #cccccc;
    bottom: -70px;
    transition: all 1s ease;
    .btn {
      height: 30px;
      width: 90px;
      background: slateblue;
    }
    .item {
      width: 100%;
      height: 70px;
      background: seagreen;
    }
  }
  .on {
    bottom: 0px;
  }
}
</style>