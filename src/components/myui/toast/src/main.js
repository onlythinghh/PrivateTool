import Vue from 'vue'
import Main from './main.vue'

let ToastConstructor = Vue.extend(Main)

let instance
let timer
let times = 3000

const close = () => {
    instance.visible = false
    instance = null
    window.clearTimeout(timer)
}

const Toast  = (options = {}) => {
    // if(typeof options === 'string') {
        options = {
            message: typeof options === 'string' ? options : options.message, // 提示信息
            timeout: options.timeout || times,   // 显示时间
            position: options.position || 'middle', // 显示位置
        }
    // }
    const {timeout = times } = options
    // console.log('options111',options)
    if(instance) {
        const {message, timeout, position} = options
        instance.message = message
        instance.timeout = timeout
        instance.position = position
    } else {
        instance = new ToastConstructor({
            data: options
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
        instance.visible = true
        // console.log('instance',instance)
    }
    if(timer){
        window.clearTimeout(timer) 
    }
    timer = setTimeout(close, timeout)
    return instance
}
Toast.close = close

export default Toast
