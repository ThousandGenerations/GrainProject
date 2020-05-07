//路由器对象模块
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'

//声明使用插件
Vue.use(VueRouter);
//修正 Vue原型上的push/replace

//保存本来的 push和 replace方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

//重写原型上的方法 (三个参数,1 地址,2 成功的 promise,3 失败的 promise)  // location  onComplete  onAbort
VueRouter.prototype.push = function (location, onComplete, onAbort) {
    //判断: 如果调用push 的时候传了成功或者失败的回调函数 就不需要修正
    //     如果调用 push的时候没有传回调 才需要修改
    if (onComplete || onAbort) {
        //有一个为真就说明已经调用 执行原本的函数就行 不需要修正
        originPush.call(this, location, onComplete, onAbort) //调用之前保存过的 push 方法 
        //为什么要用 call ? 此时函数的 this 执行已经不再是VueRouter 的实例对象了 用 call让这个函数指向实例对象
    } else {
        //进入这个判断就说明没有传成功或者失败的回调函数
        //修正这个函数(catch 这个错误,返回一个新的状态为 pending 的 promise 对象)
        return originPush.call(this, location).catch(e => {
            // console.log(e)
            return new Promise(() => {

            })
        })
    }
}

//originReplace

VueRouter.prototype.push = function (location, onComplete, onAbort) {
    //判断: 如果调用push 的时候传了成功或者失败的回调函数 就不需要修正
    //     如果调用 push的时候没有传回调 才需要修改
    if (onComplete || onAbort) {
        //有一个为真就说明已经调用 执行原本的函数就行 不需要修正
        originReplace.call(this, location, onComplete, onAbort) //调用之前保存过的 push 方法 
        //为什么要用 call ? 此时函数的 this 执行已经不再是VueRouter 的实例对象了 用 call让这个函数指向实例对象
    } else {
        //进入这个判断就说明没有传成功或者失败的回调函数
        //修正这个函数(catch 这个错误,返回一个新的状态为 pending 的 promise 对象)
        return originReplace.call(this, location).catch(e => {
            // console.log(e)
            return new Promise(() => {

            })
        })
    }
}
//配置所有路由
export default new VueRouter({
    //模式 默认 hash
    mode: 'history',
    //配置所有路由
    routes,
})