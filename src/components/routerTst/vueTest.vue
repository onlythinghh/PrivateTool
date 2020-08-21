<template>
    <div class="router">
        <div>{{$route.params.id}}</div>
        <!-- <router-link to="/rutTst/Foo/tmpA">TMPA</router-link>
        <router-link to="/rutTst/Foo/tmpB">TMPA</router-link> -->
        <!-- <router-view></router-view> -->
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        beforeRouteUpdate(to, from, next) {
            console.log("to", to);
            console.log("from", from);
            console.log("next", next);
            next();
        }
    },
    watch:{
        // $route (to, from){
        //     console.log('watch to:', to);
        //     console.log('watch from:', from)
        // }
    }
};
</script>
<style lang="scss" scoped>
</style>
