let Validator = function () {
  this.cache = [];
}

// 定义校验规则
Validator.prototype.strategies = {
  isNonEmpty: function (value, errorMsg) {
    if (!value) return errorMsg
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) return errorMsg
  },
  maxLength: function (value, length, errorMsg) {
    if (value.length > length) return errorMsg
  },
  isMobile: function (value, errorMsg) {
    if (!/(^1[0-9]{10}$)/.test(value)) return errorMsg
  },
  // 是否身份证
  ID: function (value, errorMsg) {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) return errorMsg
  },
  // 是否为邮政编码
  isPostal: function (value, errorMsg) {
    if (!/^[0-9]{6}$/.test(value)) return errorMsg
  },
  // 是否为真
  isReally: function (value, errorMsg) {
    if (!Boolean(parseFloat(value))) return errorMsg
  }
}

Validator.prototype.add = function (value, rules) {
  let self = this
  for (let i = 0, rule; rule = rules[i++];) {
    (function (rule) {
      let strategyAry = rule.strategy.split(':');
      let errorMsg = rule.errorMsg;
      self.cache.push(function () {
        let strategy = strategyAry.shift();
        strategyAry.unshift(value);
        strategyAry.push(errorMsg);
        return self.strategies[strategy].apply(null, strategyAry);
      })
    })(rule)
  }
}

Validator.prototype.start = function () {
  for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    let errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg
    }
  }
}

export default Validator;

/**
 * 使用策略模式进行信息校验、表单必填校验
 * 参考：https://juejin.im/post/6844904200917221389#heading-72   66-5策略模式
 * demo: /ruleText
 * 使用：
  let validatorfn = function () {
    let validator = new Validator()
    // 添加多个校验
    validator.add('123', [
      {strategy: 'isNonEmpty',errorMsg: '不能为空'},
      {strategy: 'minLength:4',errorMsg: '长度不能小于6位'}
    ])
    // 单条校验
    validator.add('158123456789', [
      {strategy: 'isMobile',errorMsg: '手机号错误'}
    ])
    validator.add('4567890', [
      {strategy: 'isPostal',errorMsg: '邮政编号错误'}
    ])

    let errorMsg = validator.start();

    // 使用全局方法：
    // 1.在mian.js文件注册全局方法；
    // 2.通过定义的this.$_validator 调用方法；
    // this.$_validator.add(this.name, [
    //   {strategy: 'isNonEmpty',errorMsg: '名字不能为空'}
    // ])
    // let errorMsg = this.$_validator.start();

    return errorMsg;
  }
  let errorMsg = validatorfn();
  console.log(errorMsg);
 *
 */