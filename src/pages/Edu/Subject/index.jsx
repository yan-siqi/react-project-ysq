import React, { Component } from "react";
//从 antd中引入样式button
import { Button, Table } from "antd";
//引icon图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getSubjectList, getSubSubjectList } from "./redux";
import "./index.less";
//使用装饰器语法

@connect(
  (state) => ({
    subjectList: state.subjectList,
  }), //获取状态数据
  {
    getSubjectList, //获取更新一级分类列表数据的方法
    getSubSubjectList, //获取更新二级分类列表数据的方法
  }
)
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
class Subject extends Component {
  state = {
    expandedRowKeys: [],
  };
  async componentDidMount() {
    /*    const result = await reqGetSubjectList(1, 10);
    //更新数据
    this.setState({
      subjects:result
    }); */
    // const result = await reqGetSubjectList(page, limit);
    // this.getSubjectList(page, limit);
    //const { page, limit } = this.state;
    try {
      await this.props.getSubjectList(1, 10);
    } catch (err) {
      //此时返回失败的promise
    }
  }
  handleExpend = (expanded, record) => {
    //进行判断
    if (!expanded) return;
    //请求二级菜单数据/展开一级菜单数据
    this.props.getSubSubjectList(record._id); //通过id标识获取数据
  };
  handleExpandedRowsChange = (expandedRowKeys) => {
    console.log("handleExpandedRowsChange", expandedRowKeys);
    const length = expandedRowKeys.length;
    if (length > this.state.expandedRowKeys.length) {
      //如果长度大于之前的长度,说明是展开分类列表
      //显示数组中的最后一个'
      const lastKey = expandedRowKeys[length - 1];
      //需需要发送请求,展开二级分类列表的数据'
      this.props.getSubSubjectList(lastKey);
    }
    //更新state,说明table的子菜单需要展开
    this.setState({
      expandedRowKeys,
    });
  };
  //getSubjectList = async (page, limit) => {
  //发送请求,异步获取一级分类列表
  // const result = await reqGetSubjectList(page, limit);
  //console.log("11111");

  //更新数据
  //this.setState({
  // subjects: result,
  //});
  //};
 //显示添加界面
  showAddSubject=()=>{
    this.props.history.push('/edu/subject/add')
  }
  render() {
    const { subjectList, getSubjectList } = this.props;
    const {expandedRowKeys} =this.state
    const columns = [
      { title: "分类名称", dataIndex: "title", key: "name" },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: () => (
          <>
            <Button type="primary" alt="=编辑">
              <FormOutlined />
            </Button>
            <Button type="danger" className="subject-btn">
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
    ];

    return (
      <div className="subject">
        <Button type="primary" className="subject-btn" onClick={this.showAddSubject}>
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns} //决定列头
          expandable={{
            //决定列是否可以展开
            //决定行展开
            expandedRowKeys,
            //展开行之后会触发的方法,将[]中的内容作为参数传入
            onExpandedRowsChange: this.handleExpandedRowsChange,
            // expandedRowRender: (record) => {
            //   //判断有儿子没
            //   const children = record.children ? record.children : [];
            //   return children.map((subSubject) => {
            //     return (
            //       <div key={subSubject._id} className="sub-subject-row">
            //         <div>{subSubject.title}</div>
            //         <div className="sub-subject-row-right">
            //           <Button type="primary">
            //             <FormOutlined />
            //           </Button>
            //           <Button type="danger" className="subject-btn">
            //             <DeleteOutlined />
            //           </Button>
            //         </div>
            //       </div>
            //     );
            //   });
            // },
            // onExpand: this.handleExpend,
          }}
          dataSource={subjectList.items}
          rowKey="_id"
          //数据分页展示:
          pagination={{
            // current: subjects.page,
            total: subjectList.total, //是分页器的总数
            showQuickJumper: true, //快速跳转
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            //pageSize: subjects.limit,
            // defaultPageSize: subjects.limit,
            defaultPageSize: 10,
            //绑定事件 当前页码发生变化的回调
            onChange: getSubjectList, //当页码发生变化时触发的回调函数
            onShowSizeChange: getSubjectList,
          }}
        />
      </div>
    );
  }
}
export default Subject;
