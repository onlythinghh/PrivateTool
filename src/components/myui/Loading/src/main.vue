<template>
    <div class="loading-box" v-if="visible" @touchmove.prevent>
        <div class="loading-bg" v-if="mask"></div>
        <div class="loading-center">
            <img class="laoding-icon" src="../images/loading.gif" >
            <p class="loading-text">{{message}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            message:"", // 加载中文字
            visible: false, // 是否显示
            mask: true, // 是否显示遮罩背景
        }

    }
}
</script>
<style lang="scss" scoped>
.loading-box{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    .loading-bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
    }
    .loading-center{
        min-width: 100px;
        max-width: 75%;
        height: 100px;
        display: flex;
        padding: 0 5px;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .laoding-icon{
            width: 40px;
            height: 40px;
            margin: 0 auto;
        }
        .loading-text{
            width: 100%;
            height:20px;
            color: #ffffff;
            line-height: 20px;
            font-size: 14px;
            text-align: center;
            padding-top: 4px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
.fade-enter-active,
.fade-leave-active{
    transition: opacity 0.25s ease-out;
}
.fade-enter,
.fade-leave-to{
    opacity: 0;
}
</style>
