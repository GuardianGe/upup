/* 在执行当前 Single 只获得唯一一个对象
单例模式，是一种常用的软件设计模式。在它的核心结构中只包含一个被称为单例的特殊类。
通过单例模式可以保证系统中，应用该模式的一个类只有一个实例。即一个类只有一个对象实例。 */

var Single = (function(){
    var instance;
    function init() {
        // 定义私有方法和属性
        // 操作逻辑
        return {
           // 定义公共方法和属性
        };
    }
    return {
        // 获取实例
        getInstance:function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }
    }
})();

var obj1 = Single.getInstance();
var obj2 = Single.getInstance();
console.log(obj1 === obj2);