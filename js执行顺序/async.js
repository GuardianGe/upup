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

//pr2 4 then2 set1 pr1 then1 set3 set2

//js开始执行-微任务为空，执行[宏任务]整体js代码
//首次执行，同步打印 pr2、4，微：['then2'] 宏：[’set1','set3']
//先执行微任务then2，再执行宏任务set1，控制台 pr2、4、then2、set1、pr1
//此时 微：['then1'] 宏：[’set3','set2']
//先执行微任务then1,再执行宏任务，控制台 pr2 4 then2 set1 pr1 then1 set3 set2
