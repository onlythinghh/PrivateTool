<template>
    <div class="lazyLoad">
        
        <ul class="LoadImg">
            <div v-lazy-container="{ selector: 'img', error: '../../assets/img/err.png', loading: '../../assets/img/loading.gif' }">
                <img data-src="https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp" >
                <img data-src="https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200sw.webp" error width="100%">
                <img data-src="https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp">
                <hr>
                <img :data-src="error" width="100%">  
            </div>
            <br>
            <li v-for="(item, index) in webdata " :key="index">
                <img v-lazy="item" data-error="../../assets/img/err.png">
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data (){
        return {
            imgdata: [
                require('./img/1.jpg'),
                require('./img/2.jpg'),
                require('./img/3.jpg'),
                require('./img/4.jpg'),
                require('./img/1.jpg'),
                require('./img/2.jpg'),
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp',
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200ww.webp',
                require('./img/1.jpg'),
                require('./img/2.jpg'),
                require('./img/3.jpg'),
                require('./img/4.jpg'),
                require('./img/1.jpg'),
                require('./img/2.jpg'),
                require('./img/3.jpg'),
                require('./img/4.jpg'),
                require('./img/1.jpg'),
                require('./img/2.jpg'),
                require('./img/3.jpg'),
                require('./img/4.jpg'),
                require('./img/1.jpg'),
                require('./img/2.jpg'),
                require('./img/3.jpg'),
                require('./img/4.jpg'),
            ],
            webdata:[
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp',
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200ww.webp','https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp',
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp','https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp',
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp','https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp',
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp','https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp',
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp','https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp',
                'https://media1.giphy.com/media/2A7yoKf2B87kotTApZ/200w.webp',
            ],
            loading: require('../../assets/img/loading.gif'),
            error: require('../../assets/img/err.png')
        }
    }
}
</script>

<style lang="scss" scoped>
.lazyLoad{
    width: 100%;
    height: 100%;
    .LoadImg{
        margin: 10px;
        li{
            height: 250px;
            img{
                width: 100%;
                height: 100%;
                // &[lazy=error]{
                //     background: salmon;
                // }
            }
        }
    }
}
</style>

