<template>
    <div class="attayTest">
        <p>qqq<q>aaa</q></p>
        <MoneyKeyBoard></MoneyKeyBoard>
    </div>
</template>
<script>
export default {
    data() {
        return {
            arr:[0,1,2,3,4,5,6,7,8,9],
            arr1: [1,4,-8,-3,6,12,9,8],
        }
    },
    mounted() {
        // this.testArr();
        this.duplicate();
        // this.PaulIrish();
        console.log('洗牌法随机数', this.random(this.arr))
        console.log('随机数', this.simpleRandom(this.arr))
        let arrs = [1,4,-8,-3,6,5,9,8,2,4,7]
        this.esySort(this.arr1)
        console.log('冒泡排序：', this.arr1)
        console.log('快速排序：', this.quickSort(arrs))

    },
    methods: {
        // 随机数简略写法
        // 利用随机出一个正数或者负数来让数组里面的内容两两对比，是正数就是顺序，是负数则是倒序，
        // 这种方法的缺点就是随机性不高，不能完全随机，因为是两两对比，所以最后一个数在最后的可能性较大
        simpleRandom(arr) {
            let clone = arr.concat()
            clone.sort(function(a, b) {
                return Math.random() - 0.5
            })
            return clone
        },
        // 数据洗牌法随机数（推荐）
        // 利用随机出的index下标对应的数，与数组从前到后相互切换，所以称为洗牌，代码运行效率相比前面几种高，随机性也很大。
        random(arr) {
            if(!arr.length) return
            // 复制一个数据
            let cloneArr = arr.concat()
            let len = cloneArr.length
            for( let i=0; i<len; i++ ) {
                // 获取一个随机数下标
                let index = Math.floor(Math.random() * len)
                // 保存（得到）当前随机数
                let tmp = cloneArr[index]
                // 数组中随机下标和当前第i个下标的数值位置兑换
                cloneArr[index] = cloneArr[i]
                cloneArr[i] = tmp
            }
            return cloneArr
        },

        // 数组冒泡排序
        // 比较两个相邻的元素如果第一个比第二个大，就交换他们的位置
        esySort(arr) {
            for(let j=0; j<arr.length-1; j++) {
                for(let i=0; i<arr.length-1-j; i++) {
                    if(arr[i] > arr[i+1]) {
                        let tmp = arr[i]
                        arr[i] = arr[i+1]
                        arr[i+1] = tmp
                    }
                }
            }
        },
        // 快速排序
        quickSort(arr) {
            console.log('进入',arr)
            if(arr.length <= 1 ) return arr
            let cent = arr.splice(Math.floor(arr.length / 2), 1) // 取一个中间值
            let left = [], right = []
            for(let i=0; i<arr.length; i++) {
                // 比较当前值是否小于中间值；小的放左边大的放右边
                if(arr[i] < cent) {
                    left.push(arr[i])
                } else {
                    right.push(arr[i])
                }
            }
            console.log(left, right)
            return this.quickSort(left).concat(cent, this.quickSort(right)) // 递归重复比较
            // concat()方法连接两个或多个数组，不会改变原有数组，返回一个新数组
        },
        // 数组去重
        testArr () {
            let num = [1, 1, 2];
            let set = new Set(num)
            let nn = Array.from(set)
            console.log(nn)
            console.log('num',num)
        },
        // 数组合并
        duplicate () {
            let arr = [1,2,3,4,5]
            console.log(arr.concat(arr))
        },
        PaulIrish() {
            for( let i=0; i < 100; i++ ) {
                let f = i % 3 == 0;
                let b = i % 5 == 0;
                // console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i)
                if(f && b) {
                    console.log('FizzBuzz')
                } else if(f){
                    console.log('Fizz')
                }
                if(b) {
                    console.log('Buzz')
                } else {
                    console.log(i)
                }
            }
        },
        
        // 递归法深拷贝
        deepClone (obj) {
            let cloneObj = Array.isArray(obj) ? [] : {}
            if (obj && typeof obj === 'object') {
                for (let key in obj) {
                    if(obj.hasOwnProperty(key)) {
                        //判断ojb子元素是否为对象，如果是，递归复制
                        if(obj[key] && typeof key[key] === 'object') {
                            cloneObj[key] = this.deepClone(obj[key])
                        } else {
                            // 如果不是，简单复制
                            cloneObj[key] = obj[key]
                        }
                    }
                }
                return cloneObj
            }
            return obj
        },
    }
}
</script>

<style lang="scss" scoped>
.attayTest{

}
</style>

