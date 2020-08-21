<template>
  <div class="vuex">
    Vuex
    <div>
      <button @click="add">+</button>
      <span>{{count}}</span>
      <p @click="changename">{{name}}</p>
    </div>
    
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
// import store from '../../store/index'
export default {
  data(){
    return {

    }
  },
  computed:{
    ...mapGetters(['count', 'name'])
  },
  mounted(){
  },
  methods:{
    ...mapActions(['CountAdd', 'changeName']),
    // 方法1
    // countadd() {
    //   this.CountAdd()
    // },
    // 方法2 
    ...mapActions({add:'CountAdd'}),

    changename () {
      this.changeName('tin')
    }
  }
};
</script>
<style lang="scss" scoped>
.vuex {
  font-size: 14px;
}
</style>