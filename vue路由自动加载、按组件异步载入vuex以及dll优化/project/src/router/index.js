import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let r = require.context('../components',true,/\.route\.js/)
let arr = []
r.keys().forEach((key)=>{
  arr = arr.concat(r(key).default)
})
const routes = [
  ...arr
]

const router = new VueRouter({
  routes
})

export default router
