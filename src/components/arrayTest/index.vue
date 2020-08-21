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

        }
    },
    mounted() {
        this.testArr();
        this.duplicate();
        this.PaulIrish()
    },
    methods: {
        testArr () {
            let num = [1, 1, 2];
            // let set = new Set(num)
            // let nn = Array.from(set)
            // console.log(nn)
            
            
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
        }
    }
}
</script>

<style lang="scss" scoped>
.attayTest{

}
</style>

