// 1.快速排序：

// 思路：找到数组中间的元素，把它单拎出来，然后从0开始判断数组中的元素比该基准元素大还是小，小的存左边，大的存右边，然后如此反复递归，得出结果。
var arr = [1,6,2,78,23,54,57,23,567,890,12,22,28]
function fast(arr){
    if (arr.length <= 1) { return arr; }
    var base  = Math.floor(arr.length/2);
    var baseNum = arr.splice(base,1)[0];
    var left = [],
    right = [];
    for(var i in arr){
        if(arr[i]>=baseNum){
            right.push(arr[i])
        }else{
            left.push(arr[i])
        }
    }
    return fast(left).concat([baseNum],fast(right))
}
console.log(fast(arr))