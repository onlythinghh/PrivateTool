import Hselect from './src/main.vue'

Hselect.install = (Vue, option) => {
    Vue.component(Hselect.name, Hselect)
}
export default Hselect