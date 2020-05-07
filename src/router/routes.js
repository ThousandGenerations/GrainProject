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
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    // 将params参数和query参数映射成属性传入路由组件(通过 props 传参)
    // props: route => ({
    //     keyword3: route.params.keyword,
    //     keyword4: route.query.keyword2
    // })
}, {
    path: '/register',
    component: Register
}, {
    path: '/login',
    component: Login
}]