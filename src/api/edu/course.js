//设置接口请求函数
import request from "@utils/request"
const BASE_URL='/admin/edu/course'
//请求获取所有数据
export function reqGetAllCourseList(){
    return request({
        url:`${BASE_URL}`,
        method:'GET'
    })
}
//请求获取所有分页列表数据
export function reqGetCourseList({page,limit,teacherId,subjectId,subjectParentId,title,sortBy,sort}) {
    return request({
        url:`${BASE_URL}/${page}/${limit}`,
        method:'GET',
        params:{
            teacherId,subjectId,subjectParentId,title,sortBy,sort
        }
    })
    
}