
for (let index = 0; index < 10; index++) {
}
addEventListener('message', function (e) {
  console.log(e.data);
  
  postMessage(123)
}, false);