//实现apply

Function.prototype.myapply = function(context){
    var context = context?Object(context):window;
    context.fn = this;
    var result = Object.create(null)
    if(arguments[1]){
        result = context.fn(...arguments[1])
    }else{
        result = context.fn()
    }
    delete context.fn;

    return result
    
}

console.log(Object.prototype.toString.myapply(123)