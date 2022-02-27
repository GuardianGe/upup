//判断数据类型
//typeof 
let num = 123,str = '123',und = undefined,nu = null,bool = true;
let obj = {name:123},arr = [1,2,3],fn = function(){};
console.log(typeof num,'--num'); //number
console.log(typeof str,'--str');//string
console.log(typeof und,'--und');//undefined
console.log(typeof nu,'--nu');//object
console.log(typeof bool,'--bool');//boolean
console.log(typeof obj,'--obj');//object
console.log(typeof arr,'--arr');//object
console.log(typeof fn,'--fn');//function

function isType(data){
    return Object.prototype.toString.call(data).match(/\[object (.+?)\]/)
}

console.log(isType(num)) //[object Number]
console.log(isType(str))//[object String]
console.log(isType(und))//[object Undefined]
console.log(isType(nu))//[object Null]
console.log(isType(bool))//[object Boolean]
console.log(isType(obj))//[object Object]
console.log(isType(arr))//[object Array]
console.log(isType(fn))//[object Function]
