//所有请求的模块
import ajax from './ajax'

//请求三级列表
export function reqBaseCategoryList() {
    return ajax({
        method: 'GET',
        url: '/product/getBaseCategoryList'
    })
}