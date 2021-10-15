Promise.prototype.myAll = function (list) {

    return new Promise((resovle, reject) => {
        var count = list.length;
        var resList = [];
        list.map((item, index) => {
            item.then(res => {
                count--
                resList[index] = res
                if (count === 0) {
                    resovle(resList)
                }
            })
                .catch(err => {
                    reject(err)
                })
        })
    })
}


function flat(arr) {
    arr.reduce((pre, cur) => {
        return pre = Object.prototype.toString.call(cur) == '[object Array]' ? pre.concat(flat(cur)) : pre.concat(cur)
    }, [])
}



var a = "2+2+3*3+3";

function getValue(a) {
    var arr1 = a.split('+');
    var count = 0;
    arr1.forEach(item => {
        let arr2 = item.split('*')
        if (arr2.length > 1) {
            count += arr2.reduce((pre, cur) => {
                return pre = Number(pre) * Number(cur)
            }, 1)
        } else {
            count += Number(item)
        }
    });
    return count;
}

console.log(getValue(a))


var str = '[abc[cdf[efg]]]'
var obj = {
    value: "abc",
    child: {
        value: 'cdf',
        child:{
            value:'efg'
        }
    }
}
var arr = str.split('[').map(e=>e.split(']')).flat().filter(e => e)
function changeformat(arr, index = 0) {

}
var arr1 = new Array(arr.length)
let newArr = arr.map((item,index)=>{
   return {
       value:item,
       pid:arr[index+1]?arr[index+1]:''
   }
})
newArr.map((item,index)=>{
    newArr.map((item02,index02)=>{
        if(item.pid == item02.value){
            item.child = item02
        }
    })
})
console.log(newArr[0])



var str2 = '12-3/6+3*4';

class Count{
    constructor(str){
        this.str = str;
        this.jianList = str.split('-');
        this.jian(this.jianList)
        this.jiaList = this.jianList.map((item,index)=>{
            let arr = [];
            let jiaArr = item.split('+');
            if(jiaArr.length>1){

            }
        })
    }
    jian(list){
        var fun = function(){
            list.reduce((pre,cur)=>{
                return pre = pre!==0? Number(pre)-Number(cur): Number(cur);
            },0)
        }
        this.taskList.push(fun);
        return this;
    }
    cheng(list){
        var fun = function(){
            list.reduce((pre,cur)=>{
                return pre = pre!==0? Number(pre)*Number(cur): Number(cur);
            },0)
        }
        this.taskList.push(fun);
        return this;
    }

}

