import Vue from 'vue'
import App from '@/App'
//引入路由对象
import router from './router'
import TypeNav from '@/components/TypeNav'
//引入store
import store from './store'
Vue.config.productionTip = false

//注册全局组件
Vue.component('TypeNav', TypeNav)

new Vue({
  render: h => h(App),
  router, //配置路由器
  store,
}).$mount('#app')