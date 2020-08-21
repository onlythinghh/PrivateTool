// https://blog.csdn.net/qq_37943295/article/details/82911773
//  设置文字适配
// 用法： 在mian.js中引入此js文件即可
(function flexible(window, document) {
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1; // 检测屏幕的dpr 赋值默认值为1
    
    // 是否今天
  //   function isToday(str) {
  //     var d = new Date(str.replace(/-/g,"/")); // 将时间戳的-转为/ 才兼容、比如苹果ios系统不支持“-”的
  //   var todaysDate = new Date();
  //   if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
  //       return true;
  //   } else {
  //       return false;
  //   }
  //  }
   
  //  var istoday = isToday('2020-04-03');
  //  console.log('istoday',istoday)
  //  if(istoday){
  //   var htm = document.getElementsByTagName('html')[0]
  //   htm.style.filter =  'grayscale(100%)'
  //  }
    // adjust body font size
    function setBodyFontSize() {
      if (document.body) {
        //document.body.style.fontSize = (12 * dpr) + 'px'
      } else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize);
      }
    }
    setBodyFontSize();
  
    // set 1rem = viewWidth / 10
    function setRemUnit() {
      var rem = docEl.clientWidth / 10;
      docEl.style.fontSize = rem + 'px';
    }
  
    setRemUnit();
  
    // reset rem unit on page resize 设置html的font-size
    window.addEventListener('resize', setRemUnit);
    window.addEventListener('pageshow', function(e) {
      if (e.persisted) {
        setRemUnit();
      }
    });
  
    // detect 0.5px supports
    // 创建一个0.5px去检测，看是否得到浏览器的支持，若支持则认为浏览器支持1px以下像素，否则则认为不支持
    if (dpr >= 2) {
      var fakeBody = document.createElement('body');
      var testElement = document.createElement('div');
      // 给该div一个0.5像素的透明border
      testElement.style.border = '.5px solid transparent';
      fakeBody.appendChild(testElement);
      // document.documentElement加入fakeBody
      docEl.appendChild(fakeBody);
      // 当testElement.offsetHeight即可视高度能够为1的时候，证明该浏览器是可以让0.5px显示出1的效果
      // 从而证明该浏览器可以支持到1px以下像素的显示
      // 于是在docEl赋值自定义属性data-dpr为其dpr
      if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines');
      }
       // 移除该dom
      docEl.removeChild(fakeBody);
    }
  })(window, document);
  