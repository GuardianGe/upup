//请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
var arr1 =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
var arr2 =  ['A', 'B', 'C', 'D'];
let newArr = arr1.concat(arr2);

newArr.sort((a,b)=>{
    return a.localeCompare(b)
})
console.log(newArr)