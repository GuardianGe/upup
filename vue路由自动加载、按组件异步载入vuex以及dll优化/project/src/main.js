import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuepl from './vuepl'
Vue.use(vuepl)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
