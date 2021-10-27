/*
 * @Description: 处理移动端键盘收起的问题
 * @Author: hzh
 * @Date: 2021-09-09 15:12:30
 * @FilePath: \PrivateTool\src\tools\mobileKeyboard.js
 */
(function () {
  var u = navigator.userAgent, app = navigator.appVersion
  console.log('userAgent:', u)
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端    
  var scrollH = 0
  var timer = null
  document.body.addEventListener('focusin', function (e) {
    if (e.target.tagName && e.target.tagName === 'INPUT') {
      if (isiOS) {
        clearTimeout(timer)
        scrollH = document.body.scrollTop || document.documentElement.scrollTop
      }
    }
  })
  document.body.addEventListener('focusout', (e) => {
    if (e.target.tagName && e.target.tagName === 'INPUT') {
      if (isiOS) {
        timer = setTimeout(() => {
          window.scrollTo(0, scrollH)
        }, 10)
      }
    }
  })
  if (isAndroid) {
    document.body.addEventListener('focusin', function (e) {
      if (e.target.tagName && e.target.tagName === 'INPUT') {
        timer = setTimeout(() => {
          e.target.scrollIntoViewIfNeeded()
        }, 500)
      }
    })
    window.addEventListener('resize', function () {
      console.log('resize')
      if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
        timer = window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded()
        }, 200)
      }
    })
  }
})()
