/* 
    配置所有路由对象
*/
//引入所有路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

//配置所有路由规则(数组)
export default [{
    //地址
    path: '/',
    //路由描述文件/地址
    component: Home
}, {
    path: '/search',
    component: Search
}, {
    path: '/register',
    component: Register
}, {
    path: '/login',
    component: Login
}]