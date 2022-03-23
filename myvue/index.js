let obj = {
  a: 1,
  b: {
    name: 1,
    c: {
      name: 2
    }
  }
}



class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    this.oldVal = this.getOldValue()
  }
  getOldValue() {
    Dep.target = this
    let oldVal = compileUtils.getValue(this.vm, this.expr)
    Dep.target = null
    return oldVal
  }
  notify() {
    let newVal = compileUtils.getValue(this.vm, this.expr)
    if (newVal != this.oldVal)
      this.cb(newVal)
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(w => w.notify())
  }
}



class Observer {
  constructor(value) {
    this.value = value
    this.observer(value)
  }
  observer(data) {
    if (typeof data == 'object') {
      Object.keys(data).forEach(v => this.defineReactive(obj, v, obj[v]))
    }
  }
  defineReactive(data, key, value = obj[key]) {
    this.observer(value)
    let dep = new Dep()
    Object.defineProperty(data, key, {
      get() {
        Dep.target && dep.addSub()
        return value
      },
      set(newVal) {
        this.observer(newVal)
        if (newVal == value) return
        value = newVal
        dep.notify()
      }
    })
  }
}

class Vue {
  constructor(option) {
    this.$el = option.el
    this.$data = option.data
    this.$option = option

    if (this.$el) {
      new Observer(this.$data)
      new Compile(this.$el, this)
      this.proxy(this.$data)
    }
  }
  proxy(data) {
    Object.keys(data).forEach(v => {
      Object.defineProperty(this, v, {
        get() {
          return data[v]
        },
        set(newVal) {
          data[v] = newVal
        }
      })
    })
  }
}