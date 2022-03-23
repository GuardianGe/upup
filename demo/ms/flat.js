const data = [{
    key: 'key1',
    name: 'name1',
    children: [{
            key: 'key2',
            name: 'name2',
            children: [{
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
}]

function flat(list, newList = [], parentid = 0) {
    list.map((item, index) => {
        let obj = {
            parentid: parentid,
            key: item.key,
            name: item.name
        }
        newList.push(obj)
        if (item.children) {
            flat(item.children, newList, item.key)
        }
    })
    return newList
}


function flat02(list, parentid = 0) {
    return list.reduce((pre, cur) => {
        let obj = {
            parentid: parentid,
            key: cur.key,
            name: cur.name
        }
        pre.push(obj);
        return pre = !cur.children ? pre : pre.concat(flat02(cur.children, cur.key))
    }, [])
}



console.log(JSON.stringify(flat(data)));

console.log(JSON.stringify(flat02(data)))