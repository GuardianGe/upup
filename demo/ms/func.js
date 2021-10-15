//混合题型

var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();

//下面代码中 a 在什么情况下会打印 1？

//考察==会进行隐式转换。所以重写toString方法进行隐式转换
var a = {
    i:1,
    toString:function(){
        return a.i++
    }
};
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}

//输出以下代码的执行结果并解释为什么
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a)
console.log(a.x) 	
console.log(b.x)

