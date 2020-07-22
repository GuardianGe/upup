### 内存大小
- 和操作系统有关，64位为1.4G，32位为0.7G
- 64位下新生代的空间为64MB，老生代为1400MB
- 32位下新生代的空间为16MB，老生代为700MB

> js内存回收会暂停整个代码的执行

### V8引擎的内存分配
![](https://upload-images.jianshu.io/upload_images/11260586-d78e782d29f05f40.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#### 新生代转换为老生代的条件
1. 新生代内存占用25%以上
2. 经历过一次回收但仍然存在的变量
#### 区别
算法不同
    - 老生代牺牲空间换取时间，会产生磁盘碎片
    - 新生代一分为二，把不能回收的变量标记并进行复制

### 监听内存占用
    1. node端 — process.memoryUsage()
    2. 浏览器 — window.performance
代码:
```
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
```
运行结果：
![](https://upload-images.jianshu.io/upload_images/11260586-c10954b786ecae22.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  当内存不足时，function b 中的局部变量未被引用，直接回收，直到内存不足报错。
> 当确认变量不再会被引用，可将变量的值设置为null或undefined来进行释放。

### 相关引用
    1. 大文件上传 （切片上传）
    2. node读取大文件，应使用stream,而不是readFile
### 性能监控方法
-  lighthouse
- 回报代码