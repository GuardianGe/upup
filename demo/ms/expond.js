let arr = [
    { "key": "key1", "name": "name1" },
    { "key": "key2", "name": "name2", "parentId": "key1" },
    { "key": "key4", "name": "name4", "parentId": "key2" },
    { "key": "key5", "name": "name5", "parentId": "key2" },
    { "key": "key3", "name": "name3", "parentId": "key1" }
]
function expond(list){
    list.map((item01,index02)=>{
        list.map((item02,index02)=>{
            if(item02.parentId&&item01.key==item02.parentId){
                item01.children = item01.children?item01.children.concat(item02):[item02]
            }
        })
    })
    return list.filter(e=>!e.parentId)
}
console.log(JSON.stringify(expond(arr)))