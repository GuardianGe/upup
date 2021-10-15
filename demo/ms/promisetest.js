const promise = new Promise((resolve,reject)=>{
    console.log("初始化")
    setTimeout(()=>{
        resolve(1111)
    })
})
promise.then(res=>{
    console.log(res,'第一次')
    return 1
})
.then(res=>{
    console.log(res,'第二次')
})