import request from "@utils/request";
const BASE_URL = "/admin/edu/chapter";
//获取所有课程数据'
export function reqGetChapterList({ page, limit, courseId }) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
    params: {
      courseId,
    },
  });
}
//请求删除多个章节列表
export function reqBatchRemoveChapterList(idList) {
  return request({
    url: `${BASE_URL}/batchRemove`,
    method: "DELETE",
    data: {
      idList,
    },
  });
}
