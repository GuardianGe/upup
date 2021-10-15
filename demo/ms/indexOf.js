Array.prototype.newIndexOf = function(){
    var searchvalue = arguments[0]
    var fromIndex = arguments[1] ? arguments[1] : 0;
    var arr = this.valueOf();
    var result = -1
    for(let i in arr){
        if(searchvalue===arr[i]&&i>=fromIndex){
            return i;
        }
    }
    return result;
}
console.log([1,2,3,4,5,6,7,4,4,4].newIndexOf(4,4))

String.prototype.newIndexOf = function(){
    var searchvalue = arguments[0]
    var fromIndex = arguments[1] ? arguments[1] : 0;
    var arr = this.valueOf();
    var result = -1
    for(let i in arr){
        if(searchvalue===arr[i]&&i>=fromIndex){
            return i;
        }
    }
    return result;
}
console.log('123453678sdsdfaaaaacccasqw'.newIndexOf('a',2))