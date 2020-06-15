
import {CHANGE_LANGUAGE} from '../constants/lang'
const initLang =window.navigator.language==='en'?'en':'zh'//定义初始化数据
export default function  language(prevState=initLang,action) {
  switch (action.type){
    case CHANGE_LANGUAGE:
      return action.data 
      default:
        return prevState
  }
}