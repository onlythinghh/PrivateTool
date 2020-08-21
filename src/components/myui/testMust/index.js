import HTest from './src/main.vue'

HTest.install = (Vue, option) => {
    Vue.component(HTest.name, HTest)
}
export default HTest