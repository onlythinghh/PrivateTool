<template>
    <div class="debounces">
        防抖第二版
        <p @click="loadReq">点击</p>
        <div class="container" @mousemove="onMouseoves">{{count}}</div>
    </div>
</template>
<script>
import { sendRequests, _throttle2, debounces2 } from "../../tools/index";
export default {
    data() {
        return {
            count: 0
        }
    },
    mounted(){
        
    },
    methods: {
        loadReq() {
            const allRequest = [
            "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=1",
            "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=2",
            "https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?index=3"
            ];
            sendRequests(allRequest, 2,(res) => {console.log(res)})
        },
        // 防抖的原理就是：你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，
        // 那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行
        debounces(func, wait, immediate) {
            let timeout = null, result = null
            let debounced = function() {
                let context = this
                let args = arguments
                console.log('11111')
                if(timeout) clearTimeout(timeout)
                if(immediate) {
                    let callNow = !timeout
                    timeout =setTimeout(function() {
                        timeout = null
                    }, wait)
                    if(callNow) result = func.apply(context, args)
                } else {
                    timeout = setTimeout(function() {
                        func.apply(context, args)
                    }, wait)
                }
                return result
            }
            debounced.cancel = function() {
                clearTimeout(timeout);
                timeout = null
            }
            return debounced
        },
        onMouseoves: _throttle2(function(){
            console.log('111')
            this.count = this.count + 1
        }, 1000,true)
        
        
    }
}
</script>
<style lang="scss" scoped>
.container{
    width: 100%;
    height: 400px;
    text-align: center;
    font-size: 40px;
    background: #ccc;
}
</style>