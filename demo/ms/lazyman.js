

// var LazyMan = new LazyManClass();
//要求设计 LazyMan 类，实现以下功能。
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
class LazyManClass{
    constructor(name){
        this.name = name;
        console.log(`Hi I am ${name}`)
        this.taskList = [];
        let _this = this;
        setTimeout(()=>{
            this.next()
        },0)
    }
    eat(food){
        let that = this;
        var fn = function(){
            console.log(`I am eating ${food}`)
            that.next()
        }
        this.taskList.push(fn)
        return this;
    }
    sleepFirst(time){
        let that = this;
        var fn = function(){
            setTimeout(()=>{
                console.log(`等待了${time}秒`)
                that.next()
            },1000*time)
        }
        this.taskList.unshift(fn)
        return this;
    }
    sleep(time){
        let that = this;
        var fn = function(){
            setTimeout(()=>{
                console.log(`等待了${time}秒`)
                that.next()
            },1000*time)
        }
        this.taskList.push(fn)
        return this;
    }
    next(){
        if(this.taskList.length>0){
            this.taskList.shift()()
        }
    }
}
function LazyMan(name){
    var fn =  new LazyManClass(name)
    return fn
}
