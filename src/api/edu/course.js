//设置接口请求函数
import request from "@utils/request"
const BASE_URL='/admin/edu/course'
//获取请求数据
export function reqGetAllCourseList(){
    return request({
        url:`${BASE_URL}`,
        method:'GET'
    })
}