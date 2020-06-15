import React from "react";
import { Router } from "react-router-dom";
import { ConfigProvider } from "antd"; //引入国际化配置保证,antd中自己的组件可以进行国际化
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
import { IntlProvider } from "react-intl"; //引入租定义国际化方案
import { zh, en } from "./locales";
import { connect } from "react-redux";
import history from "@utils/history";
import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App({ language }) {
  //自定义的国际化方案
  const messages = language === "en" ? en : zh;
  //anted定义的国际化方案
  const locale = language === "en" ? enUS : zhCN;
  return (
    <Router history={history}>
      <ConfigProvider locale={locale}>
        <IntlProvider
          locale={language} // 当前语言环境
          messages={messages} // 加载使用的语言包
        >
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default connect((state) => ({ language: state.language }))(App);
