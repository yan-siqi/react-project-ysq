import request from "@utils/request";
//设置公共前缀
const BASE_URL='/admin/edu/subject';//内部通过代理到线上地址 是3000端口号的地址
//设置mock地址
const MOCK_BASE_URL=`http://localhost:8000${BASE_URL}`//自己模拟的地址,显示完整的服务器地址
export function reqGetSubjectList(page,limit){
return request({
    url:`${MOCK_BASE_URL}/${page}/${limit}`,//请求地址
    method:'GET'//请求方式
})
}