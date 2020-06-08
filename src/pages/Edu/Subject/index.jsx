import React, { Component } from "react";
//从 antd中引入样式button
import { Button, Table } from "antd";
//引icon图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { reqGetSubjectList } from "@api/edu/subject";
// import { reqGetSubjectList } from "../../../api/edu/subject";
import "./index.less";
/* 
静态组件
 */
/* 
笔记:
1.如果找数据的话:
来源:自己模拟(mook) \后台接口直接使用
2.后台给前台=>接口的地址,数据,参数
3.参考文档进行开发
4.自己写服务器模拟数据
*/
export default class Subject extends Component {
  state = {
    subjects: {
      total: 0,
      items: [],
      limit: 5,
      currentpage: 1, //定义当前页
    },
  };

  componentDidMount() {
    /*    const result = await reqGetSubjectList(1, 10);
    //更新数据
    this.setState({
      subjects:result
    }); */
   // const result = await reqGetSubjectList(page, limit);
    // this.getSubjectList(page, limit);
    this.getSubjectList(1,10);
  }
  getSubjectList = async (page, limit) => {
    //发送请求,异步获取一级分类列表
    const result = await reqGetSubjectList(page, limit);
    console.log("11111");

    //更新数据
    this.setState({
      subjects: result,
    });
  };
  render() {
    const { subjects } = this.state;
    const columns = [
      { title: "分类名称", dataIndex: "title", key: "name" },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: () => (
          <>
            <Button type="primary">
              <FormOutlined />
            </Button>
            <Button type="danger" className="subject-btn">
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
    ];

    /*   const data = [
      {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
          "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
      },
      {
        key: 2,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
          "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
      },
      {
        key: 3,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
        description: "This not expandable",
      },
      {
        key: 4,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
          "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
      },
    ]; */
    return (
      <div className="subject">
        <Button type="primary" className="subject-btn">
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns} //决定列头
          expandable={{
            //决定列是否可以展开
            //决定行展开
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={subjects.items}
          rowKey="_id"
          //数据分页展示:
          pagination={{
            current: subjects.page,
            total: subjects.total, //是分页器的总数
            showQuickJumper: true, //快速跳转
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            //pageSize: subjects.limit,
            defaultPageSize: subjects.limit,

            //绑定事件 当前页码发生变化的回调
            onChange: this.getSubjectList, //当页码发生变化时触发的回调函数
            onShowSizeChange: this.getSubjectList,
          }}
        />
      </div>
    );
  }
}
