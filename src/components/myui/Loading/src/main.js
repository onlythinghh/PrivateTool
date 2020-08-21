import Vue from 'vue'
import Main from './main.vue'
let LoadingConstructor = Vue.extend(Main)

let instance

// 关闭loading
const close = () => {
    instance.visible = false;
    instance = null;
}

const Loading = (options = {}) => {
    options = {
        message: typeof options === 'string' ? options : options.message, // 提示文字
        mask: options.mask === false ? options.mask : true, // 遮罩背景
    }
    if (instance) {
        const { message, mask } = options
        instance.message = message
        instance.mask = mask
    } else {
        instance = new LoadingConstructor({
            data: options
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
        instance.visible = true
    }
    return instance
}

Loading.close = close

export default Loading

