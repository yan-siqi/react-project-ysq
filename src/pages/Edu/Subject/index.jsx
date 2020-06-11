import React, { Component } from "react";
//从 antd中引入样式button
import { Button, Table, Tooltip, Input, message, Modal } from "antd";
//引icon图标
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { getSubjectList, getSubSubjectList, updateSubject } from "./redux";
import { reqDelSubject } from "@api/edu/subject";
import "./index.less";
//使用装饰器语法

@connect(
  (state) => ({
    subjectList: state.subjectList,
  }), //获取状态数据
  {
    getSubjectList, //获取更新一级分类列表数据的方法
    getSubSubjectList, //获取更新二级分类列表数据的方法
    updateSubject, //
  }
)
class Subject extends Component {
  state = {
    expandedRowKeys: [],
    subjectId: "", //要更新的分类id
    subjectTitle: "", //要更新的分类数据标题
    updateSubjectTitle: "", //正在更新的标题数据
    current: 1,
    pageSize: 10, //设置每页条数
  };
  componentDidMount() {
    //请求第一页数据
    this.getSubjectList(1, 10);
  }
  //展开一级菜单项
  handleExpandedRowsChange = (expandedRowKeys) => {
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
  //解决第二页切换时每页数量显示不正确的问题
  getFirstPageSubjectList = (page, limit) => {
    //  this.props.getSubjectList(1, limit);
    this.getSubjectList(1, limit);
  };
  //显示添加界面
  showAddSubject = () => {
    this.props.history.push("/edu/subject/add");
  };
  //显示更新课程分类接麦你
  showUpdateSubject = (subject) => {
    return () => {
      //判断
      if (this.state.subjectId) {
        message.warn("已经存在了,请更新当前课程分类");
        return;
      }
      this.setState({
        subjectId: subject._id,
        subjectTitle: subject.title,
      });
    };
  };
  //收集更新分类的标题数据
  handleInputChange = (e) => {
    this.setState({
      updateSubjectTitle: e.target.value,
    });
  };

  //更新课程分类数据
  updateSubject = async () => {
    const { subjectId, updateSubjectTitle, subjectTitle } = this.state;
    if (!updateSubjectTitle) {
      message.warn("请更新有效数据");
      return;
    }
    if (updateSubjectTitle === subjectTitle) {
      message.warn("更新的分类标题不能和之前的一样");
      return;
    }
    await this.props.updateSubject(updateSubjectTitle, subjectId);
    //提示文本
    message.success("更新数据成功");
    this.cancel();
  };
  //取消课程分类
  cancel = () => {
    //跟新数据将所有的数据清空
    this.setState({
      subjectId: "",
      updateSubjectTitle: "",
    });
  };
  delSubject = (subject) => {
    return () => {
      Modal.confirm({
        title: (
          <p>
            你确定要删除吗<span className="subject-text">{subject.title}</span>
            {""} 课程分类吗
          </p>
        ),
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          await reqDelSubject(subject._id);
          message.success("删除陈功");
          const { current, pageSize } = this.state;
          if (
            current > 1 &&
            this.props.subjectList.items.length === 1 &&
            subject.parentId === "0"
          ) {
            this.getSubjectList(current - 1, pageSize);
            return;
          }
          this.getSubjectList(current, pageSize);
        },
      });
    };
  };
  getSubjectList = (page, limit) => {
    this.setState({
      current: page,
      pageSize: limit,
    });
    return this.props.getSubjectList(page, limit);
  };
  render() {
    const { subjectList } = this.props;
    const { expandedRowKeys, current, pageSize } = this.state;
    const columns = [
      {
        title: "分类名称",
        key: "title",
        render: (subject) => {
          const { subjectId } = this.state;
          //得到当前渲染的分类id
          const id = subject._id;
          if (subjectId === id) {
            return (
              <Input
                className="subject-input"
                defaultValue={subject.title}
                onChange={this.handleInputChange}
              />
            );
          }
          return <span>{subject.title}</span>;
        },
      },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: (subject) => {
          const { subjectId } = this.state;
          const id = subject._id;
          if (subjectId === id) {
            return (
              <>
                <Button type="primary" onClick={this.updateSubject}>
                  确认
                </Button>
                <Button className="subject-btn" onClick={this.cancel}>
                  取消
                </Button>
              </>
            );
          }
          return (
            <>
              <Tooltip title="编辑课程分类">
                <Button
                  type="primary"
                  alt="=编辑"
                  onClick={this.showUpdateSubject(subject)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除课程分类">
                <Button
                  type="danger"
                  className="subject-btn"
                  onClick={this.delSubject(subject)}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
    ];

    return (
      <div className="subject">
        <Button
          type="primary"
          className="subject-btn"
          onClick={this.showAddSubject}
        >
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns} //决定列头
          expandable={{
            //决定列是否可以展开
            //决定行展开
            expandedRowKeys,
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          dataSource={subjectList.items}
          rowKey="_id"
          //数据分页展示:
          pagination={{
            current,
            pageSize,
            total: subjectList.total, //是分页器的总数
            showQuickJumper: true, //快速跳转
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            //pageSize: subjects.limit,
            // defaultPageSize: subjects.limit,
            defaultPageSize: 10,
            //绑定事件 当前页码发生变化的回调
            onChange: this.getSubjectList, //当页码发生变化时触发的回调函数
            onShowSizeChange: this.getFirstPageSubjectList,
          }}
        />
      </div>
    );
  }
}
export default Subject;
