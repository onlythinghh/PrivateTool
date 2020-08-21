import popSelect from './src/main.vue';

popSelect.install = (Vue, option) => {
    Vue.component(popSelect.name, option)
}

export default popSelect;
