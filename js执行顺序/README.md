## 流程图

![1595230951390.jpg](https://upload-images.jianshu.io/upload_images/11260586-f064fb862b98ffca.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 首先执行同步任务，异步任务会插入到异步队列中。同步任务执行完毕，查询是否有异步任务，回到主任务执行。

### 微任务与宏任务
js执行时会把代码分为微任务与宏任务，当微任务为空时才会继续执行宏任务

> 微任务：Promise，process.nextTick
> 宏任务：整体代码script，setTimeout，setInterval

```
setTimeout(()=>{
    console.log('set1')
    new Promise((resolve,reject)=>{
        console.log('pr1')
        resolve()
    }).then(()=>{
        console.log('then1')
    })
})
new Promise((resolve,reject)=>{
    console.log('pr2')
    resolve()
}).then(()=>{
    console.log('then2')
    setTimeout(()=>{
        console.log('set2')
    })
})
setTimeout(()=>{
    console.log('set3')
})
console.log(4)

// 打印结果：pr2 4 then2 set1 pr1 then1 set3 set2

// js开始执行-微任务为空，执行[宏任务]整体js代码
// 首次执行，同步打印 pr2、4，微：['then2'] 宏：[’set1','set3']
// 先执行微任务then2，再执行宏任务set1，控制台 pr2、4、then2、set1、pr1
// 此时 微：['then1'] 宏：[’set3','set2']
// 先执行微任务then1,再执行宏任务，控制台 pr2 4 then2 set1 pr1 then1 set3 set2
```



