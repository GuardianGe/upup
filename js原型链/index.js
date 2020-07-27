
function a(){
    this.a1 = 5
}
a.prototype.getA = function(){
    console.log(this.a)
}
var aa = new a()


function b(){
    this.b1 = 10
}
b.prototype = new a()
var bb = new b()



//prototype
//只有函数对象有，指向该函数的原型对象

// Object.prototype是一个对象，用于表示Object的原型对象。
// 几乎所有的JavaScript对象都是Object的实例，其原型链上最后一个就是指向Object.prototype。
// 一个典型的对象继承了Object.prototype的属性和方法。

// 也可以创建没有原型对象的对象，比如通过Object.create(null)创建，或通过Object.setPrototypeOf(obj, null)方法来改变指定对象的原型对象。
// 改变Object.prototype的属性和方法，或给Object.prototype添加属性和方法，都会影响到原型链上的所有对象，除非这些对象本身有定义相同的属性和方法进一步覆盖。

console.log(Object.prototype == Object.prototype)
console.log(Function.prototype == Function.prototype)


//__proto__ 
//每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）

console.log(Object.prototype.__proto__ == null) //原型链最顶端
console.log(Object.__proto__ == Function.prototype) //Object是Function的实例 ？？
console.log(Function.__proto__ == Function.prototype)//Function是Function的实例 ？？
console.log(Function.prototype.__proto__ == Object.prototype)//Function.prototype是Object的实例 ？？

console.log(a.__proto__ == Function.prototype)
console.log(aa.__proto__ == a.prototype)
console.log(bb.__proto__ == b.prototype)

console.log(a.prototype.__proto__ == Object.prototype)
console.log(b.prototype.__proto__ == a.prototype)


//constructor   
//返回对创建此对象的函数对象的引用。（函数对象原型永远指向其一个实例）
console.log(Function.constructor == Function)
console.log(Function.prototype.constructor == Function)
console.log(Function.__proto__.constructor == Function)

console.log(Object.constructor == Function)
console.log(Object.prototype.constructor == Object)
console.log(Object.__proto__.constructor == Function)

console.log(a.constructor == Function)

console.log(a.prototype.constructor == a)
console.log(b.prototype.constructor == a)
console.log(aa.constructor == a)
console.log(aa.__proto__.constructor == a)
console.log(bb.constructor == a)
