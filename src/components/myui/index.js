// 多个封装插件的使用

import keyBoard from './keyBoard/src/main.vue'
import MoneyKeyBoard from './testkey/src/main.vue'
import Hinput from './input/src/main.vue'
import Hselect from './select/src/main.vue'
import popSelect from './popSelect/src/main.vue'
import HTest from './testMust/src/main.vue'
import Toast from './toast/index'
import Loading from './Loading/index'
import Loadmore from './LoadMore/src/main.vue'

const components = [
    keyBoard,
    MoneyKeyBoard,
    Hinput,
    Hselect,
    popSelect,
    HTest,
    Loadmore
]

const install = (Vue, option) => {
    components.forEach(component => {
        Vue.component(component.name, component)
    })

    Vue.prototype.$toast = Toast
    Vue.prototype.$closeToast = Toast.close
    Vue.prototype.$loading = Loading
    Vue.prototype.$closeLoading = Loading.close
}



export default {
    install,
    keyBoard,
    MoneyKeyBoard,
    Hinput,
    Hselect,
    popSelect,
    Loadmore
}
