import keyBoard from "./src/main.vue"

keyBoard.install = (Vue, option) => {
    Vue.component(keyBoard.name, keyBoard)
}
export default keyBoard
// 单一个插件在项目中使用