//根据原来的数据和action生成新的状态
import { GET_SUBJECT_LIST,GET_SUB_SUBJECT_LIST } from "./constants";
//看请求回来的对象 初始化数据所对应的形式 是对象的
const initSubjectList = {
  total: 0,
  items: [], //课程分类列表数据
};
//获取课程分类列表数据一二级
export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST: //获取一级分类数据
    //  return action.data;
    return {
        total:action.data.total,
        items:action.data.items.map((subject)=>{
            return{
                ...subject,
                //添加children当前项就是可展开项,才会显示展开图标
                children:[],
            }
        })
    }
    case GET_SUB_SUBJECT_LIST: //获取二级分类数据
      //将二级分类添加到某个一级分类的上
      //获取数据parentId和subSubjectList
      const{parentId,subSubjectList}=action.data
      return {
        total: prevState.total,
        items: prevState.items.map((subject) => {
          if (subject._id === parentId) {
            subject.children = subSubjectList;
          }
          return subject;
        }),
      };
    default:
      return prevState;
  }
}
