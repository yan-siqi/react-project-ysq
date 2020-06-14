import request from "@utils/request";
//设置公共前缀
const BASE_URL = "/admin/edu/subject"; //内部通过代理到线上地址 是3000端口号的地址
//设置mock地址
//const MOCK_BASE_URL = `http://localhost:9000${BASE_URL}`; //自己模拟的地址,显示完整的服务器地址
//请求获取一级分类列表数据
export function reqGetSubjectList(page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`, //请求地址
    method: "GET", //请求方式
  });
}
//请求获取二级分类列表数据
export function reqGetSubSubjectList(parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`, //请求地址
    method: "GET", //请求方式
  });
}
//添加请求数据
export function reqAddSubject(title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId,
    },
  });
}
//跟新课程分类数据
export function reqUpdateSubject(title, id) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      title,
      id,
    },
  });
}
//删除课程分类数据
export function reqDelSubject(id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}
//获取所有一级课程列表
export function reqGetAllSubjectList() {
  return request({
    url:`${BASE_URL}`,
    method:"GET"
  })
}
