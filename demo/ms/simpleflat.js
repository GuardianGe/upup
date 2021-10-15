var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
//简单类型的数组扁平化
function flat(arr){
    return arr.reduce((pre,cur)=>{
        return pre = Array.isArray(cur)?pre.concat(flat(cur)):pre.concat(cur);
    },[])
}
console.log(flat(arr))





