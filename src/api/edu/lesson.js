import request from "@utils/request";
import { chapter } from "../../pages/Edu/Chapter/redux";

// 模块请求公共前缀
const BASE_URL = "/admin/edu/lesson";
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}

//获取所有的课程数据
export function reqGetLessonlist (chapterId){
  return request({
    url:`${BASE_URL}/get/${chapterId}`,
    method:'GET'
  })
}
//新增课时数据
export function reqAddLesson({chapterId,title,free,video}){
  return request ({
    url:`${BASE_URL}/save`,
    method:'POST',
    data:{
      chapterId,
      title,
      free,
      video
    }
  })
}