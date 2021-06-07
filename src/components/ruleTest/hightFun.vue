<template>
  <div class="Higher-order">
    <!-- 高阶函数 -->
    内置高阶函数  查看console
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    
  },
  methods:{
    init() {
      this.arrDiyfn()
      this.arrMap()
      this.arrReduce()
      this.arrFilter()
      this.arrSort()
    },
    
    arrMap() {
      // 内置高阶函数
      // 1. Array.prototype.map
      // map()(映射)方法最后生成一个新数组，不改变原始数组的值。其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。
      const arr1 = [1, 2, 3, 4];
      const arr2 = arr1.map(item => item * 2);  console.log( arr2 ); // [2, 4, 6, 8]
    },

    arrReduce() {
      // 2. Array.prototype.reduce
      // reduce() 方法对数组中的每个元素执行一个提供的 reducer 函数(升序执行)，将其结果汇总为单个返回值。接收四个参数
      // accumulator:累加的值 currentValue:当前元素 currentIndex:当前元素的索引 array:原始数组本身
      const arr = [0, 1, 2, 3, 4];
      let sum = arr.reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue;
      }); console.log('reduce累加：', sum ); // 20
    },

    arrFilter() {
      // 3. Array.prototype.filter
      // filter(过滤，筛选) 方法创建一个新数组,原始数组不发生改变。
      // filter的callback函数返回布尔值如果为true表示通过，为false表示失败。
      // 新的数组由所有返回true的元素组成，如果没有任何元素通过就返回空数组
      const arr1 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
      const arr2 = arr1.filter( (element, index, self) => {
        return self.indexOf( element ) === index;
      }); console.log('filter过滤：', arr2 ) // [1, 2, 3, 5, 4]
    },

    arrSort() {
      // 4. Array.prototype.sort
      // sort() 方法用原地算法对数组的元素进行排序，并返回数组，该排序方法会在原数组上直接进行排序，并不会生成一个排好序的新数组。
      // 排序算法现在是稳定的。默认排序顺序是根据字符串Unicode码点。
      // 该方法的返回函数是可选的，用作指定按照某种顺序排列的函数
      let arr = [10, 20, 1, 2];
      arr.sort(function (x, y) {
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
      console.log('sort排序：',arr); // [1, 2, 10, 20]
      // 默认排序（不严谨 会有bug）
      // 默认排序时会将比较的数字转换成字符串，因此在Unicode顺序上 "10" 要比 "2" 要靠前。
      let arr1 = arr.sort(); // [1, 10, 2, 20]
    },

    arrDiyfn() {
      // 5. 自己创建高阶函数
      // 创建了一个高阶函数 mapForEach ，它接受一个数组和一个回调函数 fn。 它循环遍历传入的数组，
      // 并在每次迭代时在 newArray.push 方法调用回调函数 fn 。回调函数 fn 接收数组的当前元素并返回该元素的长度，
      // 该元素存储在 newArray 中。 for 循环完成后，newArray 被返回并赋值给 lenArray。
      const strArray=['JavaScript','PHP','JAVA','C','Python'];
      let lenArr = this.mapForeach(strArray, (item) => {
        return item.length
      })
      console.log('lenArr:',lenArr)// [10,3,4,1,6]
    },

    mapForeach(arr, fn) {
      let newArr = []
      for(let i=0; i< arr.length; i++) {
        newArr.push(
          fn(arr[i])
        )
      }
      return newArr
    },
  }
  
}
</script>