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
 * 防抖 input事件
 * 事件高频触发时n秒之后才会执行一次，就是说事件n秒之内没有再触发了才会执行一次，如果n秒内再次触发则重新计时
 * @param {*} fn 需要执行的函数
 * @param {*} wait 执行时间间隔
 */
const _Debounce = (fn, wait) => {
  const delay = wait || 500
  let timer = null
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

// 检测是否 http:// 或者 https:// 开头
const checkHttp =(val) => {
  let str = val.toString()
  if (!str) return false
  let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  let strExp = new RegExp(Expression);
  if(strExp.test(str)){
    return true
  } else {
    return false
  }
}
// 获取链接后面全部参数，返回一个json exp: let arr = getUrlData()
const getUrlData = () => {
  // let url = 'https://www.ule.com?aa=1&bb=22&cc=33&dd=44&ee=e5555'
  let url = window.location.href
  if (url.indexOf('?') != -1) {
    let Arr = url.split('?')[1]
    let str = Arr.split('&')
    let rest = {}
    for(let i=0; i<str.length; i++) {
      rest[str[i].split('=')[0]] = decodeURI(str[i].split('=')[1])
    }
    return rest
  } else {
    return {}
  }
}
// 获取链接后面指定的参数
const QueryUrlString = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || ''
}

/** 类型判断
 * isType('String', '123123')
 * @param {string} type 需要校验的类型
 * @param {*} obj 需要校验的数据
 * @returns {boolean} true / false 返回一个布尔值 
 */
const isType = (type, obj) => {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
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
  formatDate,
  checkHttp,
  getUrlData,
  QueryUrlString,
  isType,
}