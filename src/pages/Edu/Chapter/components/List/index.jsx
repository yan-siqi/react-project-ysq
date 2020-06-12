import React, { Component } from "react";
import { Button,Tooltip, Alert, Table,Modal } from "antd";
import {
  PlusOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
  FormOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Player from "griffith";
import { getLessonList } from "../../redux";
import "./index.less";
@withRouter
@connect((state) => ({ chapters: state.chapter.chapters }), { getLessonList })
class List extends Component {
  state = {
    expandedRowKeys: [],
    isShowVideoModal: false, //控制model的显示和隐藏
    lesson: {}, //显示数据
  };
  handleExpandedRowsChange = (expandedRowKeys) => {
    const length = expandedRowKeys.length;
    if (length > this.state.expandedRowKeys.length) {
      const lastKey = expandedRowKeys[length - 1];
      this.props.getLessonList(lastKey);
    }
    this.setState({
      expandedRowKeys,
    });
  };
  //显示添加课程
  //使用withRouter来实现路由的三大属性
  showAddLesson = (chapter) => {
    return () => {
      this.props.history.push("/edu/chapter/addlesson", chapter);
    };
  };
  showVideoModal = (lesson) => {
    
    return () => {
      this.setState({
        isShowVideoModal: true,
        lesson, //获取当期数据
      });
    };
  };
  hidden = () => {
    this.setState({
      isShowVideoModal: false, //不显示model
      lesson: {}, //将less数据重置
    });
  };
  render() {
    const { chapters } = this.props;
    const { expandedRowKeys, isShowVideoModal, lesson } = this.state;
    const columns = [
      {
        title: "名称",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        key: "free",
        render: (free) => {
          return free === undefined ? "" : free ? "是" : "否";
        },
      },
      {
        title: "视频",
        key: "video",
        render: (lesson) => {
          return (
            "video" in lesson && (
              <Tooltip title="预览视频">
                <Button onClick={this.showVideoModal(lesson)}>
                  <EyeOutlined />
                </Button>
              </Tooltip>
            )
          );
        },
      },
      {
        title: "操作",
        key: "action",
        width: 250,
        render: (data) => {
          return (
            <>
              {"free" in data ? null : (
                <Tooltip title="新增课时">
                  <Button
                    type="primary"
                    className="chapter-btn"
                    onClick={this.showAddLesson(data)}
                  >
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              )}
              <Tooltip title="更新">
                <Button type="primary">
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除">
                <Button type="danger" className="subject-btn">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
    ];
    return (
      <div className="chapter-list">
        <div className="chapter-list-header">
          <h5>课程章节列表</h5>
          <div>
            <Button type="primary">
              <PlusOutlined />
              新增
            </Button>
            <Button type="danger">批量删除</Button>
            <Tooltip title="全屏">
              <FullscreenOutlined />
            </Tooltip>
            <Tooltip title="刷新一下">
              <ReloadOutlined />
            </Tooltip>
            <Tooltip title="设置">
              <SettingOutlined />
            </Tooltip>
          </div>
        </div>
        <Alert message="已经选择0项" type="info" showIcon />
        <Table
          className="chapter-list-table"
          columns={columns} // 决定列头
          expandable={{
            // 内部默认会使用children作为展开的子菜单
            // 也就是说，如果要展开的数据有children属性，才会有展开图标，就会作为子菜单展开~
            // 负责展开行
            // 展开哪些行？[行的key值, 行的key值...]
            // [_id, _id]
            expandedRowKeys,
            // 展开行触发的方法。
            // 将展开的行[1, 2, 3]作为参数传入
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          dataSource={chapters.items} // 决定每一行显示的数据
          rowKey="_id" // 指定key属性的值是_id
          pagination={{
            total: chapters.total, //数据的总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
          }}
        />
        <Modal
          title={lesson.title}//设置标题
          visible={isShowVideoModal}//是否显示
          onCancel={this.hidden}//
          footer={null}
          centered//垂直居中
          destroyOnClose={true}//model关闭是销毁子元素
        >
          <Player sources={{hd:{play_url:lesson.video}}} />
        </Modal>
      </div>
    );
  }
}
export default List;
