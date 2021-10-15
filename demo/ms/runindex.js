function a(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(8)
            resolve(1)
            console.log(2)
        },0)
        console.log(3)
    })
}

setTimeout(()=>{
    console.log(4)
},0)
async function b(){
    console.log(5)
    // a().then(res=>{
    //     console.log(res)
    // })
    await a();
    console.log(6)
}
b();
console.log(7)

// 5、3、7、4\8、2、6

