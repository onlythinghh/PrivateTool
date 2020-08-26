// AjaxData 数据转换
// let pars = { aaa:'zhangsan', bbb: 'lisi', ccc: 'wangwu'}
// let arr = AjaxData(pars); // aaa=zhangsan&bbb=lisi&ccc=wangwu
const AjaxData = (params) => {
  let array = []
  for (let i in params) {
    array.push(i + '=' + params[i])
  }
  return array.join("&")
}

const Regular = {}
// 手机号，验证码，密码， 金额, 身份证
const test = {
  phone: () => /^1\d{10}$/,
  code: () => /^\d{6}$/,
  password: () => /^[0-9a-zA-Z~!@#$%^&*_=+-.{}<>? [,]{6,20}$/,
  money: () => /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/,
  IDCard: () => /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[Xx])$/,
}
// 检查结果
// let res = Regular.test('money', tel) // true or false
Regular.test = (type, val) => {
  const rule = test[type];
  const reg = rule && rule(val);
  return reg ? reg.test(val) : false;
}

// 某个时间后就去执行某个函数，使用Promise封装
// /slidePanel有使用实例
const sleep = (fn, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fn)
    }, time)
  })
}

/**
 *  函数节流
 *  当持续触发事件时，有规律的每隔一个时间间隔执行一次事件处理函数
 * @param {*} fn  延时调用的函数
 * @param {*} time  延迟多长时间
 * 
 * 防抖和节流都可以用于 mousemove、scroll、resize、input等事件，
 * 他们的区别在于防抖只会在连续的事件周期结束时执行一次，而节流会在事件周期内按间隔时间有规律的执行多次。
 */
const _Throttle = (fn, time) => {
  let last
  let timer
  const interval = time || 300
  return function() {
    const _THIS = this
    const args = arguments
    const now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function() {
        last = now
        fn.apply(_THIS, args)
      }, interval)
    } else {
      last = now
      fn.apply(_THIS, args)
    }
  }
}
/**
 * 防抖
 * @param {*} fn 需要执行的函数
 * @param {*} wait 执行时间间隔
 */
const _Debounce = (fn, wait) => {
  const delay = wait || 300
  let timer
  return function () {
    const _This = this
    const args = arguments
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(_This, args)
    }, delay)
  }
}

//判断android和ios
const ua = navigator.userAgent;
const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
const isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

// 数字、字符串转千分位字符串
const thousandth =(str) => {
  if(str.constructor === String || str.constructor === Number) {
    let val = str.toString()
    return val.replace(/\d(?=(?:\d{3})+(?:\.\d+|$))/g, '$&,');
  } else {
    return false
  }
}
/**
 * 
 * @param {*} date 日期 （时间戳要先转换成原始的日期格式）
 * @param {*} fmt 日期格式
 * exp:
 * let time = new Date(1598410156000)
 * formatDate(time)
 */
const formatDate = (date, fmt) => {
  // 替换年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  // 替换日期
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ""
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

const  padLeftZero = (str) => {
  return ("00" + str).substr(str.length)
}
export {
  AjaxData,
  Regular,
  isAndroid,
  isIOS,
  sleep,
  _Throttle,
  _Debounce,
  thousandth,
  formatDate
}