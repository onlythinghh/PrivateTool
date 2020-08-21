import LoadMore from './src/main.vue'

LoadMore.install = (Vue, option) =>{
    Vue.component(LoadMore.name, LoadMore)
}

export default LoadMore