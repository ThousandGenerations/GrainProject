//用于管理 home 组件
//解构赋值的方式引入api 下面的菜单请求
import {
    reqBaseCategoryList
} from '@/api'

export default {
    state: {
        baseCategoryList: [],
    },
    mutations: {
        //接收请求返回的数据
        RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
            state.baseCategoryList = baseCategoryList
        }
    },
    actions: {
        //发送请求
        async getBaseCategoryList({
            commit
        }) {
            //发送请求(异步)
            const result = await reqBaseCategoryList()
            //判断成功之后交给 mutations 管理数据
            if (result.code === 200) {
                const baseCategoryList = result.data //将返回的数据保存到state baseCategoryList
                //提交
                commit('RECEIVE_BASE_CATEGORY_LIST', baseCategoryList)
            }
        }
    },
    getters: {}
}