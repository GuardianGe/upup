// import {plus, minus} from './utils/math.js';

document.writeln("Hello webpack!");
// document.writeln('1 + 2: ', plus(1, 2));
// document.writeln('1 - 2: ', minus(1, 2));

window.setTimeout(() => {
  import("./utils/math").then((mathUtil) => {
    document.body.append("1 + 2: " + mathUtil.plus(1, 2));
    document.body.append("1 - 2: " + mathUtil.minus(1, 2));
  });
}, 2000);
