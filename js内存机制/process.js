function getme() {
    var men = process.memoryUsage();
    var format = function(bytes){
        return (bytes / 1024 /1024).toFixed(2) + 'MB';
    }
    console.log('heapTotal：' + format(men.heapTotal) +
        'heapUsed：' + format(men.heapUsed)
    )
}

var a = [];
var size = 20 * 1024 * 1024;
function b() {
    var arr1 = new Array(size)
    var arr2 = new Array(size)
    var arr3 = new Array(size)
    var arr4 = new Array(size)
    var arr5 = new Array(size)
}
b();
getme();
setInterval(()=>{
    a.push(new Array(size));
    getme();
},1000)
