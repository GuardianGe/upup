var promise = new Promise(resolve => {
  console.log(1);
  resolve();
})
setTimeout(() => {
  console.log(2);
}, 0)
promise.then(() => {
  console.log(3);
  resolve();
})

var promise2 = getPromise();
async function getPromise() {
  console.log(5);
  await promise;
  console.log(6);
}
console.log(8)

//1 5 8 3 6 2
//await promise如果没有返回值，则会跳出当前上下文，执行主线程同步方法