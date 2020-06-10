//同步actions 返回值是对象
//异步action
//当前redux管理的状态数据:课程分类数据
//对状态数据的操作:发请求获取数据/跟新数据/删除数据/提那家数据
//同步:不需要发请求 异步需要发请求

//引入一级二级分类
import { reqGetSubjectList, reqGetSubSubjectList } from "@api/edu/subject";
import { GET_SUBJECT_LIST, GET_SUB_SUBJECT_LIST } from "./constants";
//同步
const getSubjectListSync = (subjectList) => ({
  type: GET_SUBJECT_LIST,
  data: subjectList,
});

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    return reqGetSubjectList(page, limit).then((response) => {
      dispatch(getSubjectListSync(response));
      return response.items;
    });
  };
};
//二级分类 同步获取数据
const getSubSubjectListSync = (data) => ({
  type: GET_SUB_SUBJECT_LIST,
  data,
});
//二级分类 异步获取数据 方法
export const getSubSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSubSubjectList(parentId).then((response) => {
      dispatch(
        getSubSubjectListSync({ parentId, subSubjectList: response.items})
      );
      return response;
    });
  };
};
/*
正常情况异步action没有返回值 
如果外部想要使用内部的值,需要返回一个promise的值 使用return
让外边有返回值,外面通过返回值来判断 请求是否成功
内部的return 是返回一个请求的状态 给外边的额数据/
 */
