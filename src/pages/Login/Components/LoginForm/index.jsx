import React, { useState } from "react";
import { Form, Tabs, Input, Button, Checkbox, Row, Col, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"; //变成路由组件
import { login, mobileLogin } from "@redux/actions/login";
import { reqSendCode } from "@api/acl/oauth";
import "./index.less";
const { TabPane } = Tabs;
const reg = /^[a-zA-Z0-9_]+$/;
//表单校验规则
const rules = [
  { required: true },
  { max: 15, message: "输入的长度不超过15位" },
  { min: 4, message: "输入的长度不小于4位" },
  {
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "输入的内容必须包含大写字母小写字母和数字和下划线",
  },
];

const TOTAL_TIME = 60; //定义总时长
let countingDownTime = TOTAL_TIME; //倒计时60s
function LoginForm({ login,mobileLogin,history }) {
  const [form] = Form.useForm(); //form表单提供数据
  const [, setCountingDownTime] = useState(0); //只传更新组件的方法,不需要数据
  const [isSendCode, setIsSendCode] = useState(false); //判断是否已经发送了验证码
  const [activeKey, setActiveKey] = useState("user");
  const handleTabChange = (key) => {
    setActiveKey(key); //处理tab点击事件的还低啊函数
  };
  const validator = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        return reject("请您输入密码");
      }
      const len = value.length;
      if (len > 15) {
        return reject("密码长度不能超过15位");
      }
      if (len < 4) {
        return reject("密码长度不能小于4位");
      }
      if (!reg.test(value)) {
        return reject("输入的内容必须包含数字,字母和下划线");
      }
      resolve(); //如果以上条件都满足,验证成功
    });
  };
  //定义公共检验规则
  const validateMessages = {
    required: "请输入${name}",
  };
  //当表单提较的时候
  const finish = async (values) => {
    if (activeKey === "user") {
      form
        .validateFields(["username", "password", "rem"])
        .then(async (values) => {
          //使用用户名密码登录
          //此时只需考虑成功的情况不用考虑失败的情况(拦截器自动报错)
          const { username, password, rem } = values; //收集数据,并进行表单校验
          const token = await login(username, password); //发送请求,登录系统
          if (rem) {
            localStorage.setItem("user_token", token); //在本地进行持久化存储
            console.log(token)
          }
          history.replace("/"); //登录成功之后跳转到首页
        });
      return;
    }
    form.validateFields(["mobile", "code", "rem"]).then(async (values) => {
      //手机号验证码登录
      const { mobile, code, rem } = values; //获取相关信息,rem=>是否记住密码
      const token = await mobileLogin(mobile, code); //发请求,请求手机号登录
      if (rem) {
        //如果记住密码,就会持久化存储数据
        localStorage.setItem("user_token", token);
      }
      history.replace("/"); //登录成功跳转到主页
    });
  };
  const countingDown = () => {
    const timer = setInterval(() => {
      countingDownTime--; //倒计时减一减一...
      if (countingDownTime <= 0) {
        clearInterval(timer); //当到0的时候清除定时器
        countingDownTime = TOTAL_TIME; //将时长改为60
        setIsSendCode(false); //发送验证码
        return;
      }
      setCountingDownTime(countingDownTime); //重新渲染组件
    },1000);
  };
  const sendCode = () => {
    //点击发送验证码
    form
      .validateFields(["mobile"])
      .then(async ({ mobile }) => {
        await reqSendCode(mobile); //发送请求获取哦验证码
        setIsSendCode(true); //成功发送验证码
        countingDown();
        message.success("验证码发送成功");
      })
      .catch((err) => {
        //提示错误信息
      });
  };
  return (
    <Form
    form={form}
      validateMessages={validateMessages}
      initialValues={{ rem: "cheked" }}
    >
      <Tabs onChange={handleTabChange} activeKey={activeKey}>
        <TabPane tab="账户密码登录" key="user">
          <Form.Item name="username" rules={rules}>
            <Input prefix={<UserOutlined />} placeholder="用户名: admin" />
          </Form.Item>

          <Form.Item name="password" rules={rules}>
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="密码: 111111"
            />
          </Form.Item>
        </TabPane>
        <TabPane tab="手机号登录" key="mobile">
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                pattern: /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/,
                message: "请输入正确的手机号",
              },
            ]}
          >
            <Input prefix={<MobileOutlined />} placeholder="手机号" />
          </Form.Item>
          <Row justify="space-between">
            <Col>
              <Form.Item
                name="code"
                // 表单校验规则
                rules={[
                  {
                    required: true,
                    message: "请输入验证码",
                  },
                  {
                    pattern: /^[0-9]{6}$/,
                    message: "请输入正确的验证码",
                  },
                ]}
              >
                <Input placeholder="验证码" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button onClick={sendCode} disabled={isSendCode}>
                  {isSendCode
                    ? `${countingDownTime}秒后可重发`
                    : "点击发送验证码"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
      <Row justify="space-between">
        <Col>
          <Form.Item name="rem" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Checkbox type="link">忘记密码</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" className="login-form-btn" onClick={finish}>
          登录
        </Button>
      </Form.Item>
      <Row justify="space-between">
        <Col>
          <Form.Item>
            <div className="login-form-icons">
              <span>其他登录方式</span>
              <GithubOutlined className="icons" />
              <WechatOutlined className="icons" />
              <QqOutlined className="icons" />
            </div>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="link">注册</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
export default withRouter(connect(null, { login,mobileLogin })(LoginForm));
