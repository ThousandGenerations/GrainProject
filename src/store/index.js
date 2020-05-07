// vuex核心管理对象 store
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
// 采用 vuex 模块化分别管理
//声明使用
Vue.use(Vuex)


//向外暴露 store 对象

export default new Vuex.Store({
    modules,
})