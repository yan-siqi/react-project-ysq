import React, { Component } from "react";
import { Select, Button,Form } from "antd";
import './index.less'
/* 
课下补充
*/
const {Option} =Select
export default function Search(){
    const finish=()=>{
   } 
    return (
      <Form onFinish={finish} layout="inline" className="chapter-search">
        <Form.Item
          lable="选择课程"
          name="title"
          rules={[{ required: true, message: "请选择课程分类" }]}
        >
          <Select placeholder="请你选择课程分类" className="chapter-search-select">
            <Option key="1" value="1">
              1
            </Option>
            <Option key="2" value="2">
              2
            </Option>
            <Option key="=3" value="3">
             3
            </Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询章节
          </Button>
          <Button>重置</Button>
        </Form.Item>
      </Form>
    );
  }

