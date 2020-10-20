<template>
  <div class="ruleText">
    <p>规则校验测试</p>
    <div @click="test">点击开始校验</div>
  </div>
</template>
<script>
import Validator from '../../tools/validator'
export default {
  data () {
    return {
      name: 'dfd',
      min: '1234',
      max: '123456',
      mobile: '15812345678',
      id: '421555888944423588',
      postal: '153648',
    }
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
    }
  }
}
</script>