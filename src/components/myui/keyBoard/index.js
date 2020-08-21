import keyBoard from "./src/main.vue";

keyBoard.install = (Vue, options) => {
    Vue.component(keyBoard.name, keyBoard)
}

export default keyBoard;