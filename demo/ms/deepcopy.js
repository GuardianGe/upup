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

//需注意，Date(),Symbol，function等类型

function deepcopy(obj){
    let newObj = Object.prototype.toString.call(obj) === '[object Number]'?[]:{};
    // console.log(newObj,1111)
    for(let key in obj){
        newObj[key] = typeof obj[key] == 'object' ? deepcopy(obj[key]):obj[key] 
    }
    console.log(newObj,2222)
    return newObj;
}
console.log(JSON.stringify(deepcopy(data)))