
 ## 配置文字自适应方法（vw）
 1. 根据webpack。json文件安装第三方插件postcss-px-to-viewport、postcss-viewport-units、cssnano
 2. 在.postcssrc.js中的plugins下添加以下代码
  "postcss-px-to-viewport": {
    viewportWidth: 375,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
    viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
    unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数
    viewportUnit: "vw",   //指定需要转换成的视窗单位，建议使用vw
    selectorBlackList: ['.ignore', '.hairlines'],// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    minPixelValue: 2,     // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    mediaQuery: false,     // 允许在媒体查询中转换`px`
    exclude: /winningList/     //  忽略文件目录,请使用正则去匹配文件名
  },
  "postcss-viewport-units": {},
  "cssnano": {
    "preset-advanced": {
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    }
  }
