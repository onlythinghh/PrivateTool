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
    }
}

export default vfilters