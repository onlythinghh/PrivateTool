<template>
  <div class="debounce" ref="viewBox" >
    <div class="sleep" @click="testsleep">测试sleep</div>
    <hr>
    <div>
      <p>未做处理</p>
      <input type="text" v-model="txt0" />
      <p>数据响应：{{txt0}}</p>
    </div>
    <hr>
    <div>
      <p>节流处理</p>
      <input type="text" :value="txt1" @input="testThrottle" />
      <p>数据响应：{{txt1}}</p>
    </div>
    <hr>
    <div>
      <p>防抖处理</p>
      <input type="text" :value="txt2" @input="testDebounce" />
      <p>数据响应：{{txt2}}</p>
    </div>
    <br>
    <div class="tips">
      <h4>函数防抖（debounce）</h4>
      <p>解释：当持续触发某事件时，一定时间间隔内没有再触发事件时，事件处理函数才会执行一次，如果设定的时间间隔到来之前，又一次触发了事件，就重新开始延时。</p>
      <p>案例：持续触发input事件时，并不立即执行testDebounce函数，当1000毫秒内没有触发input事件时，才会延时触发一次testDebounce函数。</p>
      <p>
        原理：防抖函数在事件触发的时候不会执行，那么每次触发scroll或者input事件的时候都会清除上次延时器同时的记录一个新的延时器，
        当scroll或者input事件停止触发后,最后一次记录的延时器不会被清除因此可以延时执行，这是debounce函数的原理
      </p>
      <h4>函数节流（throttle）</h4>
      <p>解释：当持续触发事件时，有规律的每隔一个时间间隔执行一次事件处理函数。</p>
      <p>案例：持续触发input事件时，并不立即执行testThrottle函数，每隔1000毫秒才会执行一次handle函数。</p>
      <p>原理和防抖类似，在定义的方法中会定义一个时间变量，每次执行fn函数都会更新这个变量来记录本次执行的时间，下一次事件触发时判断时间间隔是否到达预先的设定，重复上述操作。</p>
      <br>
      <p>防抖和节流都可以用于 mousemove、scroll、resize、input等事件，他们的区别在于防抖只会在连续的事件周期结束时执行一次，而节流会在事件周期内按间隔时间有规律的执行多次。</p>
    </div>
  </div>
</template>
<script>
import { sleep, _Throttle, _Debounce } from "../../tools/index";
export default {
  data() {
    return {
      txt0: "0",
      txt1: "1",
      txt2: "2",
    };
  },
  mounted(){
    // window.addEventListener('scroll',_Throttle(this.doSomething, 1000), false)
    // window.addEventListener('scroll',_Debounce(this.doSomething, 1000), false)
  },
  methods: {
    // testsleep() {
    //   this.autoPaly()
    // },
    async testsleep() {
      let saySomething = (name) => console.log(`hello, ${name}`);
      let demo1 = await sleep(saySomething("lala"), 1000);
      let demo2 = await sleep(saySomething("pool"), 1000);
      let demo3 = await sleep(saySomething("huahua"), 1000);
    },
    
    doSomething() {
      console.log("11111111");
    },
    testThrottle: _Throttle( function(e){
      // console.log(e.target.value)
      this.txt1 = e.target.value
    }, 1000),

    testDebounce: _Debounce( function(e){
      console.log(this.txt2)
      this.txt2 = e.target.value
    }, 1000),

  },
};
</script>
<style lang="scss" scoped>
.debounce {
  height: 2000px;
  font-size: 14px;
  div > input {
    border: 1px solid salmon;
  }
  .tips{
    font-size: 14px;
    color: #999;
    h4{
      color: #333;
    }
    p{
      line-height: 40px;
    }
  }
}
</style>