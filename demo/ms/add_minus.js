//实现加减算法的链式调用
Number.prototype.add = function(num){
    return this.valueOf() + num
}
Number.prototype.minus = function(num){
    return this.valueOf() - num
}
console.log((1).add(20).minus(2))