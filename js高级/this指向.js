//1、隐式绑定
function fn (){
    console.log(this) //window
}
function fn1(){
    'use strict'
    console.log(this) //undefined
}
//2、箭头函数
//不能用作构造函数，内部没有arguments，没有原型
let arrow_fn = ()=>{
    console.log(this) //永远指向外层环境this
}
//3、显式绑定
//call、apply、bind

Function.prototype.mycall = function(obj){
    var context = obj?Object(obj):window
    context.fn = this
    var args = [...arguments].slice(1)
    var res = context.fn(...args)
    delete context.fn 
    return res
}
Function.prototype.myapply = function(obj){
    var context = obj ? Object(obj):window
    context.fn = this
    var args = [...arguments][1]
    var res = args?context.fn(args):context.fn()
    delete context.fn
    return res
}