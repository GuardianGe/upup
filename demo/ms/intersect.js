
//求多个数组之间的交集
function intersect(){
    let arr  = [...arguments];
    console.log(arr)
    if(arr.length<=1){
        return arr;
    }

    return arr.reduce((pre,cur)=>{
        console.log(pre)
        return pre.filter(e=>cur.includes(e))
    })
}

console.log(intersect([1,8],[1,2,3],[1,4,6,2]))