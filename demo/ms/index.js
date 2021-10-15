

const data = {
    key: 'key1',
    name: 'name1',
    children: [
        {
            key: 'key2',
            name: 'name2',
            children: [
                {
                    key: 'key4',
                    name: 'name4',

                },
                {
                    key: 'key5',
                    name: 'name5',
                }
            ]
        },
        {
            key: 'key3',
            name: 'name3',
        }
    ]
}
function getchange(obj, newObj = [{ key: obj.key, name: obj.name }], parentId = obj.key) {
    obj.children.map((item, index) => {
        let a = {
            key: item.key,
            name: item.name,
            parentId
        }
        newObj.push(a)
        if (item.children) {
            getchange(item, newObj, item.key)
        }
    })
    return newObj
}
// console.log(JSON.stringify(getchange(data)))

let arr = [{ "key": "key1", "name": "name1" }, { "key": "key2", "name": "name2", "parentId": "key1" }, { "key": "key4", "name": "name4", "parentId": "key2" }, { "key": "key5", "name": "name5", "parentId": "key2" }, { "key": "key3", "name": "name3", "parentId": "key1" }]
 
let newArr = arr.map(pre=>{
    arr.map(item=>{
        if(item.parentId&&pre.key==item.parentId){
            if(pre.children){
                pre.children.push(item)
            }else{
                pre.children = [item]
            }
        }
    })
    return pre
}).filter(e=>!e.parentId)
console.log(JSON.stringify(newArr))