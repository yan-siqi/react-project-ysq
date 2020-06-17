import {reqLogin} from "@api/acl/login"
import {reqMobileLogin} from "@api/acl/oauth"
import {LOGIN,LOGOUT} from '../constants/login'
//账户名密码登录
//同步action
 export const loginSync=(token)=>({
  type:LOGIN,
  data:token
})
//异步action
export const login =(username,password)=>{
  return (dispatch)=>{
    return reqLogin(username,password).then(({token})=>{
      dispatch(loginSync(token))
      return token
    })
  }
}
//手机号密码登录
export const mobileLogin=(mobile,code)=>{
  return (dispatch)=>{
    return reqMobileLogin(mobile,code).then(({token})=>{
      dispatch(loginSync(token));
      return token
    })
  }
}
// 登出
export const logout = () => ({
  type: LOGOUT,
});

export const removeToken = () => {};