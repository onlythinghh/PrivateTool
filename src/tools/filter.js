const vfilters = {
    // 名称过滤
    formatAddr(value) {
        const initArr = [
          '邮政局',
          '分公司',
          '邮政',
          '邮电支局',
          '公司',
          '营业分局',
          '分局',
          '营业所',
          '所',
          '支局',
          '区局'
        ]
        initArr.map(item => {
          if (value.indexOf(item) > -1) {
            const reg = new RegExp(`${item}`, 'g')
            value = value.replace(reg, '')
          }
        })
        return value
      },
    // 身份证脱敏(也可单独当作方法使用)
    idCardEncrypt (value) {
        if(value) {
            return value.replace(/^(.{1})(?:\d+)(.{4})$/, '$1** *** **** **** $2')
        }
    },
    // 手机号脱敏
    mobileEncrypt(value) {
        if (value) {
          return value.replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2')
        }
    },
    
    // 金额单位转化 getUnit:是否需要转化
    simplifiedAmount (num, getUnit = true) {
      if (!getUnit) {
          return num
      }
      if (num / 100000000 >= 1) {
        return Math.floor(num / 1000000) / 100 + '亿'
      } else if (num / 10000 >= 1) {
        return Math.floor(num / 100) / 100 + '万'
      } else {
          return num ? num : 0
      }
  },
      // 转化为千分位显示
      // value：转化金额, length: 几位数划分
    comma (value, length = 3) {
      if (!value) return 0;
      let source = value.toString().split('.')
      source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,');
      return source.join('.')
    }
}

export default vfilters