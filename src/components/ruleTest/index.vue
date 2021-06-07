<template>
  <div class="ruleText">
    <p>规则校验测试</p>
    <div @click="test">点击开始校验</div>
    <div>{{nums| simplifiedAmount(true) | comma}}</div>
    <div @click="getUrlPrams">获取链接参数(链接中随便加几个参数)</div>
    <div @click="getFlatten">数组扁平化</div>
    <div @click="unique">数组去重（查看log）</div>
    <div><input type="text" @input="testDebounce"></input>节流</div>
  </div>
</template>
<script>
import Validator from '../../tools/validator'
import { isType, accMul } from '../../tools/index'
export default {
  data () {
    return {
      name: '',
      min: '1234',
      max: '123456',
      mobile: '15812345678',
      id: '421555888944423588',
      postal: '153648',
      nums: 112333333233
    }
  },
  mounted() {
    // this.unique()
    console.log(isType('String', '123123'))
  },
  methods:{
    test () {
      let validator = new Validator()
      validator.add(this.name, [
        {strategy: 'isNonEmpty',errorMsg: '名字不能为空'}
      ])
      validator.add(this.min, [
        {strategy: 'minLength:4',errorMsg: '最小长度错误'}
      ])
      validator.add(this.max, [
        {strategy: 'maxLength:6',errorMsg: '最大长度错误'}
      ])
      // 添加多个校验
      validator.add(this.mobile, [
        {strategy: 'maxLength:11',errorMsg: '最大长度错误2'},
        {strategy: 'isMobile',errorMsg: '手机号错误'}
      ])
      validator.add(this.id, [
        {strategy: 'ID',errorMsg: '身份证错误'}
      ])
      validator.add(this.postal, [
        {strategy: 'isPostal',errorMsg: '邮政编号错误'}
      ])
      
     const errormsg = validator.start()
     console.log(errormsg)
     if(errormsg) {
      this.$toast({message: errormsg, timeout: 1000})
      return false
     }
    },
    getUrlPrams() {
      let url = window.location.href
      if(url.indexOf('?') != -1){
        let pam = url.split('?')[1] || [];
        console.log(pam)
        let arr = pam.split('&');
        let rest = {}
        for(let i = 0; i< arr.length; i++) {
          let val = arr[i].split('=')
          rest[val[0]] = val[1] 
        }
        return rest
      } else {
        return {}
      }
      
    },

    flatten(arr) {
      // concat() 扁平化数组
      //  通过循环遍历每个值并将其通过concat()将当前值扁平化 
      let result = []

      for(let i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
          result = result.concat(this.flatten(arr[i]))
        } else {
          result = result.concat(arr[i])
        }
      }

      return result
    },
    getFlatten() {
      let arr = [1,2,[3,4,['5',6]]]
      console.log(this.flatten(arr))
    },
    unique() {
      let arr = [2,1,3,1,'2',4]
      let tmp1 = [...new Set(arr)]
      let tmp2 = arr.filter((v,i, arr) => arr.indexOf(v) === i)
      let tmp3 = Array.from(new Set(arr)) // 通过set()对数组去重，结果返回set对象，再通过from()方法将set对象转换成数组
      console.log('去重：', tmp1, tmp2, tmp3)
    },
    debounce(func, wait) {
      let timeout;
      let last
      let interval = wait || 300
      console.log('12123', func)
      return function() {
        
          console.log('222222')
        const _this = this
        const args = arguments
        let now = +new Date()
        if(last && now - last < interval) {
          last = now
          timeout = setTimeout(() => {
            clearTimeout(timeout)
            func.apply(_this, args)
          }, interval)
        } else {
          last = now
          func.apply(_this, args)
        }
      }
    },

    testDebounce() {
      this.debounce(this.testlog(), 500)
    },
    testlog() {
      return 123
      console.log('节流打印')
    }
  }
}
</script>