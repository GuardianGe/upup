function foo(){
    console.log(a);
}
function bar(){
    var a = 3;
    console.log(this.a + a);
    foo();
}
var a = 2;
bar();
bar.call({a: 4})