import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
export default class Chapter extends Component {
  render() {
    return (
      <div>
       <Search /> 
       <List />
      </div>
    )
  }
}
/* 
数据是否会使用redux:要看数据是一个组件用还是多个组件用(至少是两个组件会使用=>用redux)
*/
/* 
先定义接口请求函数
定义action 的异步action =>定义同步action =>此时要定义常量模块
在定义reducers
在index中进行汇总
最后通过connect注入到组件中进行使用
*/