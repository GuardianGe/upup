//1，创建一个控对象
//2，获取构造函数
//3，链接到原型
//4，绑定this，执行构造函数
//5，返回新对象
function _new(){
    var obj  = Object.create(null);
    var con = [].shift.call(arguments);
    obj.__proto__ = con.prototype;
    var result = con.call(obj,...arguments)
    return typeof result == 'object' ? result :obj;
}