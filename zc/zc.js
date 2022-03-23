//节流和防抖
function jlfd(params) {
  function jl(fn, timeout) {
    let timer = false
    return function () {
      if (!timer) {
        timer = true
        setTimeout(() => {
          fn.apply(this, arguments)
          timer = false
        }, timeout);
      }
    }
  }

  function deb(fn, delay) {
    let timer = null
    return function () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay);
    }
  }
}

//Vue scoped原理
//PostCSS给一个组件中的所有dom添加了一个独一无二的动态属性
//然后，给CSS选择器额外添加一个对应的属性选择器来选择该组件中dom，这种做法使得样式只作用于含有该属性的dom——组件内部dom。


//深拷贝
function deepClone(obj, map = new WeakMap()) {
  if (typeof obj === 'function') {
    let fn = obj.toString()
    return obj.prototype ? eval(`(${fn})`) : eval(fn)
  }
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  if (Object.prototype.toString.call(obj) === '[object Date]') return new Date(obj)

  if (map.has(obj)) {
    return obj
  } else {
    map.set(obj, obj)
  }
  let res = Array.isArray(obj) ? [] : {}
  Object.keys(obj).forEach(v => {
    res[v] = deepClone(obj[v])
  })
  return res
}

Function.prototype.call = function (context, ...rest) {
  let context = context ? Object(context) : window
  context.fn = this
  let res = context.fn(...rest)
  delete context.fn
  return res
}
Function.prototype.apply = function (context, ...rest) {
  let context = context ? Object(context) : window
  context.fn = this
  let res = context.fn(rest)
  return res
}
Function.prototype.bind = function (context, ...rest) {
  let context = context ? Object(context) : window
  let _this = this
  return function () {
    _this.apply(context, [...arguments].contcat(rest))
  }
}

function _new(fn, ...rest) {
  let obj = Object.create(fn.prototype)
  let res = fn.apply(obj, rest)
  return typeof res == 'object' ? res : obj
}

//折面条
function mt(n) {
  let t = 1,
    sum = 2
  for (let i = 0; i < n; i++) {
    sum += t;
    t = t * 2
  }
  return sum
}

//实现一个快排
function fast(arr) {
  if (arr.length <= 1) return arr
  let midIdx = Math.floor(arr.length / 2)
  let midVal = arr.splice(midIdx, 1)[0]
  let left = [],
    right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= midVal) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return fast(left).concat(midVal, fast(right))

}


//数组转树
function fn(data) {
  let map = new Map()
  let res = []
  data.forEach(v => {
    map.set(v.id, v)
  })
  data.forEach(m => {
    let f = map.get(m.pid)
    if (f) {
      let c = f.children || []
      c.push(m)
    } else {
      res.push(m)
    }
  })
  return m
}

function fn(data) {
  let stack = data,
    res = []
  while (stack > 0) {
    let d = stack.pop()
    res.push({
      name: d.name,
      id: d.id,
      parentId: parentId
    })
    if (d.children) {
      d.children.forEach(v => {
        stack.push(v)
      })
    }
  }
  return res
}





//树转数组
function deep(node) {
  let stack = node,
    data = [];
  while (stack.length > 0) {
    let pop = stack.pop();
    data.push({
      id: pop.id,
      name: pop.name,
      parentId: pop.parentId
    })
    let children = pop.children
    if (children) {
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return data
}