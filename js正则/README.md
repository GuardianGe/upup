> ECMAScript对象中⽬前存在的属性描述符主要有两种，
数据描述符(数据属性)和存取描述符(访问器属性)，
数据描述符是⼀个拥有可写或不可写值的属性。
存取描述符是由⼀对 getter-setter 函数功能来描述的属性

### 一、属性
###### Configurable (false:不可delete,不可修改Configurable 、enumerable)
（Writable也为false,则属性都不可改）
表示能否通过delete删除此属性，能否修改属性的特性，或能否修改把属性修改为访问器属性，如果直接使用字面量定义对象，默认值为true
###### Enumerable (false:不可枚举)
表示该属性是否可枚举，即是否通过for-in循环或Object.keys()返回属性，如果直接使用字面量定义对象，默认值为true
###### Writable （false:value不能直接修改，definedProperty可改）
（Configurable也为false,则属性都不可改）
能否修改属性的值，如果直接使用字面量定义对象，默认值为true
###### Value 
该属性对应的值，默认为undefined
###### Get 
一个给属性提供 getter 的方法(访问对象属性时调用的函数,返回值就是当前属性的值)，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined
###### Set 
一个给属性提供 setter 的方法(给对象属性设置值时调用的函数)，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为 undefined

### 二、创建/修改/获取属性的方法
###### 1. Object.defineProperty(obj, prop, descriptor)
>obj: 需要被操作的目标对象
prop: 目标对象需要定义或修改的属性的名称
descriptor: 将被定义或修改的属性的描述符

在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
如果不指定configurable, writable, enumerable ，则这些属性默认值为false，
如果不指定value, get, set，则这些属性默认值为undefined
```
var obj = new Object();

Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true,
    enumerable: true,
    value: '张三'
})

console.log(obj.name)  //张三
```

###### 2. Object.defineProperties(obj, props)
>obj: 将要被添加属性或修改属性的对象
props: 该对象的一个或多个键值对定义了将要为对象添加或修改的属性的具体配置

```
var obj = new Object();
Object.defineProperties(obj, {
    name: {
        value: '张三',
        configurable: false,
        writable: true,
        enumerable: true
    },
    age: {
        value: 18,
        configurable: true
    }
})

console.log(obj.name, obj.age) // 张三, 18
```
###### 3. Object.getOwnPropertyDescriptor(obj, prop)

>obj: 需要查找的目标对象
prop: 目标对象内属性名称

该方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

```
var person = {
    name: '张三',
    age: 18
}

var desc = Object.getOwnPropertyDescriptor(person, 'name'); 
console.log(desc)  结果如下
// {
//     configurable: true,
//     enumerable: true,
//     writable: true,
//     value: "张三"
// }
```

###### 4. Object.getOwnPropertyDescriptors(obj)

>obj: 需要查找的目标对象

该方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

```
var person = {
    name: '张三',
    age: 18
}
var desc = Object.getOwnPropertyDescriptors(person);
console.log(desc)
// {
//     "name": {
//         "value": "张三",
//         "writable": true,
//         "enumerable": true,
//         "configurable": true
//     },
//     "age": {
//         "value": 18,
//         "writable": true,
//         "enumerable": true,
//         "configurable": true
//     }
// }
```
>使用 var定义的任何变量，其configurable属性值都为false，定义对象也是一样；
但是使用字面量定义的对象,该对象<内部的属性>的数据描述符属性都为true

#### Get/Set（简易数据双向绑定）
```
<input type="text" id="foo">
<button id="btn">提交</button>
<button id="btn1">设置</button>
<div>输入框的内容：<input type="text" id="xianshi"></div>
<script>
    var user = {};
    var foo = document.getElementById("foo");
    var xianshi = document.getElementById("xianshi");
    Object.defineProperty(user, 'name', {
        get: function () {
            return document.getElementById('foo').value;
        },
        set: function (newValue) {
            console.log(newValue);
            document.getElementById('foo').value = newValue;
        },
        configurable: true
    });
    foo.oninput = function () {
        xianshi.value = user.name;
    }
    xianshi.oninput = function () {
        user.name = xianshi.value;
        xianshi.innerHTML = user.name;
    }
</script>
```








