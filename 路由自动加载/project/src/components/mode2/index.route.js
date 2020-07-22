

let r = require.context('./pages',true,/.vue/)
let arr = []
r.keys().forEach((key) => {
    let _keyarr = key.split(".")
    if(_keyarr.indexOf('index') != -1){
        arr.push({
            path:_keyarr[1],
            component:r(key).default
        })
    } else {
        arr.push({
            path:_keyarr[1] + '/' + _keyarr[2],
            component:r(key).default
        })
    }
});
export default arr