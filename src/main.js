import Vue from 'vue'
import App from './App.vue'
//引入路由对象
import router from './router'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, //配置路由器
}).$mount('#app')