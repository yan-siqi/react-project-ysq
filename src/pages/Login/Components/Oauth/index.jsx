import React, { Component } from "react";
import { connect } from "react-redux";
import { loginSync } from "@redux/actions/login";
//引入loginSync
@connect(null, { loginSync })
//是授权成功后的跳转回来的组件
class Oauth extends Component {
  componentDidMount() {
    //得到地址栏的token 登陆成功
    const token = this.props.location.search.split("=")[1];
    this.props.loginSync(token);//保存到redux中
    localStorage.setItem("user_token", token); //将token保存在本地
    this.props.history.replace("/"); //最后跳转到首页界面
  }
  render() {
    return <div>授权登录中</div>;
  }
}
export default Oauth;
