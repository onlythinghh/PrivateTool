<template>
    <transition name="fade">
        <div class="Toast-box" :class="customClass" v-if="visible">
            <div class="toast">{{message}}</div>
        </div>
    </transition>
</template>
<script>
export default {
    name: "Toast",
    data() {
        return {
            // message: "", // 显示内容
            visible: false, // 是否显示
            position: "middle" // 显示位置 top center bottom
        };
    },
    props: {
        massage: {
            type: String,
            default: "啦啦啦！"
        }
    },
    computed: {
        // top:顶部显示， center:中间显示， bottom: 底部显示；默认底部显示
        customClass() {
            let classes = [];
            switch (this.position) {
                case "top":
                    classes.push("is-placetop");
                    break;
                case "bottom":
                    classes.push("is-placebottom");
                    break;
                case "center":
                    classes.push("is-placecenter");
                    break;
                default:
                    classes.push("is-placemiddle");
            }
            return classes.join(" ");
        }
    }
};
</script>
<style lang="scss" scoped>
.Toast-box {
    left: 50%;
    width: 80%;
    padding: 12px;
    position: fixed;
    // bottom: 20px;
    font-size: 14px;
    text-align: center;
    border-radius: 6px;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    &.is-placemiddle{
        bottom: 20px;
    }
    &.is-placetop{
        top: 20px;
    }
    &.is-placecenter{
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .toast {
        color: #fff;
        word-wrap: break-word;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease-out;
    // transition: all 1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>