<template>
  <div class="wraper" :class="{'show':visible}">
    <div class="keyboard" @touchstart.prevent>
      <div class="k-left">
        <!-- 1-9 -->
        <div class="k-nums">
          <ul>
            <li v-for="(item, index) in new Array(9)" :key="index">
              <div
                class="item"
                @touchstart="startFn($event)"
                @touchend="endFn($event, index + 1)"
              >{{ index + 1 }}</div>
            </li>
          </ul>
        </div>
        <!-- . 0 隐藏 -->
        <div class="k-symbol">
          <ul>
            <li v-for="(item,index) in symbols" :key="index">
              <div
                class="item"
                :class="item.icon ? item.icon : ''"
                @touchstart="startFn($event)"
                @touchend="endFn($event,item.value)"
              >{{item.label}}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 删除，完成 -->
      <div class="k-right">
        <div class="del">
          <div
            class="item icon-delete"
            @touchstart="startFn($event)"
            @touchend="endFn($event,'del')"
          ></div>
        </div>
        <div class="complete">
          <div class="item" @touchstart="startFn($event)" @touchend="endFn($event,'ok')">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoneyKeyBoard',
  data() {
    return {
      nums: new Array(9),
      symbols: [{
        value: '.',
        label: '.'
      }, {
        value: 0,
        label: 0
      }, {
        value: 'down',
        label: '',
        icon: 'icon-board-down'
      }],
      visible: false, // 默认隐藏？
      maxLength: 6, // 最大支持几位数
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    endFn(e, data) {
      e.target.style.backgroundColor = '#fff'
      if (data === 'down' || data === 'ok') {
        this.close()
      } else if (data === 'del') {
        let tempValue = this.value.substr(0, this.value.length - 1)
        this.$emit('update:value', tempValue)
      } else {
        let value = this.value, tempValue = this.value // tempValue在判断中使用，value是修改赋值使用
        const len = tempValue.length
        if (/\./.test(tempValue)) {
          // 已经有小数点的话再次输入小数点无效且小数点后最多两位
          data = data === '.' ? '' : data
          const arr = tempValue.split('.')[1]
          if (arr.length >= 2) {
            data = ''
          }
        } else {
          // 最大支持x位数
          if (len >= this.maxLength && data !== '.') {
            data = ''
          } else if (tempValue === '' && data === '.') {
            // 第一个输入'.'变为'0.'
            value = '0'
          } else if (tempValue === '0' && data !== '.') {
            // 第一个输入'0'，后面只能输入'.'
            data = ''
          }
        }
        this.$emit('update:value', value + '' + data)
      }
    },
    startFn(e) {
      e.target.style.backgroundColor = '#e2e2e2'
    },
    open() {
      this.visible = true;
      this.$emit('update:visible', this.visible)
    },
    close() {
      this.visible = false;
      this.$emit('update:visible', this.visible)
    },
  },
}
</script>

<style>
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3),
  only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2),
  only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .wraper {
    height: 271px;
    padding-bottom: 21px;
  }
}
.wraper {
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  overflow: hidden;
  position: fixed;
  z-index: 999;
  bottom: 281px;
  left: 0;
  width: 100%;
  height: 250px;
  transform: translateY(110%);
  background-color: #f1f1f1;
  box-sizing: border-box;
  box-shadow: 0 0 1px 1px #f0f0f0;
  transition: transform 0.2s cubic-bezier(0.09, 0.87, 1, 1);
}
.wraper.show {
  transform: translateY(0);
}
.keyboard {
  width: 100%;
  box-sizing: border-box;
  background-color: #f1f1f1;
  height: 100%;
  display: flex;
  padding: 7px;
  font-weight: 500;
  color: #333;
  font-family: PingFangSC, "微软雅黑";
}

/* 左边部分 */
.k-left {
  width: 75%;
  display: flex;
  flex-direction: column;
}
.k-left .k-nums {
  flex: 3;
}
.k-left .k-symbol {
  flex: 1;
}
.k-left .k-nums ul,
.k-left .k-symbol ul {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.k-left .k-nums ul li,
.k-left .k-symbol ul li {
  box-sizing: border-box;
  width: 33%;
  background-color: #f1f1f1;
  padding-right: 7px;
  padding-bottom: 7px;
}
.k-left .k-nums ul li {
  height: 33%;
}
.k-left .k-symbol ul li {
  height: 100%;
}
.item {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #333;
  border-radius: 5px;
}
.k-left .k-Symbol {
  flex: 1;
}
.k-right {
  flex: 1;
}

/* 右边部分 */
.k-right {
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
}
.del,
.complete {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 7px;
}
.icon-board-down {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAclBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACa4vOeAAAAJXRSTlMAQL/w5zoy9t24r4BkVko3Kvvr4tTIiV5RTkdELyAYDtjWp5V2wL4qnAAAAbVJREFUeNrt2dmOgkAQheHTLI6iCO4r4lbv/4pjeiZ2jNBgsBqX+u4MF+e3I8EohHhByfzosTjOE1RbzIjRbAG7LCJmUQaLDjnQQamUnEhRpkeaP/VYTH3SeigxIG0ONnPSBigWmasczHuMUMw358OmRxc+Cu24D8Acwc5yD2ZglVnuRKWvgZkeURIgAbUClHelnvH68QC6Ug1fS4AESIAEvGnAvy9+GGkS8AoBTb4HNAtofjtKgARIgAR8SEDrzwIJkIA/3oOeHkAPkgAJkAAJ+LyA1p8FEvANAaG+loNVrkdCy/+Ga7Ba65Gd5XT6YNXXI9Y/z1MwSvVEz1pHCmwUWU85n5IWnRWLc0TaNEeJBTmxsH5E+PVhERO7GFYrj1h5K1SJT7OAWASzUwwhhBBCCCHeWerVloLF9kC1HLZgst1TDfst2HS6VKnbgeGywOyzSroV+wmYJROymCRgF04s+yEcCAMqETDvmwL7Pj8VFO4rOKPGdGes4NBmfLe/gVMbn274Gzi29m/213Bu+ENXP0M4Zwrc75sCs9+O1YguRiu0Zjm67C/RoiXREq2K5cdX8fZ+AQ836c6TKGX6AAAAAElFTkSuQmCC")
    no-repeat center center / 24px 24px;
  background-color: #fff;
}
.icon-delete {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAq1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NbREAAAAOHRSTlMAgL9A62mJd0ffqo46xZN/e2330FYtIxjUuppyXltOtKShl2RgE/qmhFMoCwjwyZ4x3LAe4gQ1NCrSNb8AAANlSURBVHja7ZrJUhsxFEWfwTO2g/GAw2gbDGY0YEj6/78s6lCVswhV0rNU/RboriIq5h6aRketluTk5OTk5OTk6LOfMvr6x26RMn1t//HPIm2U/dN+YQowGbmPLCRZ9pQAvVfXPxAzgHbd9a/FDODuyPW3xAzgunBpiBnAsOw/FzOAQ1f/dCFmAGvX/74vZgAD1z97EbEC2JST9pRxdQDo5/KYL1QMsCr1033kC9UBoJ8TxhUCoJ8DxlUD9Dqu/wfjCgHQzynjqgHGpX6uhFQGgH5uxvE1egD089SOb9EDoJ9OL64gBqDp+keT+A49APrpb1MV6QEW5fS/im/QA6Cf2w/xpybe3N9rANDPUkL6Cy/BdDS7DwdAP82w/sJHsHUugcAHgH4OGUcRHD8Xxesk9AqgnyHjKIKVu5id3xIIgH7OGEcRrFzBe0/CAHj6uWH1HUfw4G7mek/CANBPndV3HMHHJd/MC4B+Or8YxxG84TIvAPoZ8SejIGDVRNxkdnQhYQDoZ4/VdyTBLTeTFwD9XD6IxBIgk3GgC/jEXEgcwYZHaQ8A+mH6jydYMpn4ANAP0380wYC1bBjAts/mSwKCA7ZSwgAmMz6RgKCJTMIAeh1+YwkI1jzLhAG068wYCQhq/DbDAO5umLFTELCYCATouhVDms0XvKACKACwuQI1lYH9e2k1CMIA5LRIdRM2/3ZzFwYCSKPgzzC+//M6tDQAcs4ucGR/69+/ThUAafbBD/gWEIQAsBZuxvaXnYyGCoByOo7T8YB+CDQAn0KaR/TThxE1ADJ93n1JtqQfJgg8ALwR3HVRekIXYVXiASAPbyzL4/q5LlchAGS+y4PJhp4vyK5VAHKiF8OC/i/ZzsIAuHmVD6fz/39KxeocAISqE8Ot538vIAgEkFZJMFT0n3uv0FgFII3wNcW47PczdnUAclYEi2Ec8PzXpT8AADkuwwhSb1QiRzYqFYkHQI5GW7XI0WqzGjlabdcjR6sXFsjR6JUNmZu9tEKOVq/tkKPhi0vkWGNcHQBytHp5jRytXt+zg251gAE5Wh3hQI5Wh1iQo/ExHnmZWR1kQo5WR7mQo9VhNuRodpwPORoeaESOayMA5DgwAkCOCwsA5Jg6WuaGGQByTJpnUaddS5m25OTk5OTk5Hz7/AGDPyES37T7QwAAAABJRU5ErkJggg==")
    no-repeat center center / 32px 32px;
  background-color: #fff;
}
</style>
