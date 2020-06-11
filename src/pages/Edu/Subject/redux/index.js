import subjectList from './reducer'
import {getSubjectList,getSubSubjectList,updateSubject} from './actions'
export {
    subjectList,//代表的是状态数据
    getSubjectList,//更新一级分类列表数据的方法
    getSubSubjectList,//跟新二级分类列表数据的方法
    updateSubject
}