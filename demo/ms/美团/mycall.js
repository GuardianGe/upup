Function.prototype.mycall = function(context){
    var context = context?Object(context):window
    context.fn = this;
    var args = [...arguments].slice(1);
    var result = context.fn(...args);
    delete context.fn;
    return result;
}