function getType(obj){
    return Object.prototype.toString.call(obj).replace(/[\[|\]]/g,'').split(' ')[1];
}

console.log(getType('123'))
console.log(getType([]))



let arr = [1,[12,2,[23]],[12,[12,[123,[123,[123]]]]]]

// function getValue(arr,count=1){
//     for(let key in arr){
//         if('[object Array]'==Object.prototype.toString.call(arr[key])){
//             console.log(1111,count,arr[key])
//             count++
//             getValue(arr[key],count)
//         }
//     }
//     return count;
// }
// console.log(getValue(arr))

function fo(arr,len) {
    var flag = false
    var arr1 = []
    for (let i = 0; i< arr.length; i++) {
      let isAry = Object.prototype.toString.call(arr[i]) == '[object Array]'
      if (isAry) {
        for(let j = 0; j< arr[i].length; j ++) {
          arr1.push(arr[i][j])
        }
        flag = true
      }
    }
    if (flag) {
      len ++
      return fo(arr1,len)
    }else {
      return len
    }
  }
  let lens = fo(arr,1)
  console.log(lens)