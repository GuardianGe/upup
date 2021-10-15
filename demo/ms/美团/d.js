function all(list){
    return new Promise((resolve,reject)=>{
        const count = list.length;
        let datalist = [];
        list.forEach((item,index)=>{
            item.then(res=>{
                  datalist.push(res)
                    count--
                if(!count){
                    resolve(datalist)
                }
            }).catch(err=>{
                reject(err)
            })
        })
        
    })
}