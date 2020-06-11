import React, { Component } from "react";
import { Button, Tooltip, Alert, Table } from "antd";
import {
  PlusOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./index.less";
export default class List extends Component {
  render() {
    return (
      <div className="chapter-list">
        <div>
          <h5 className="chapter-list-header">课程章节列表</h5>

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
        <Alert message="已经选择xx项" type="info" showIcon />
        <Table
          className="chapter-list-table"
          //columns={[]} // 决定列头
          dataSource={[]} // 决定每一行显示的数据
          rowKey="_id" // 指定key属性的值是_id
          pagination={{
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
          }}
        />
      </div>
    );
  }
}
