import React from "react";
import { Button, Card, PageHeader, Form, Input, Switch, message } from "antd";
import Upload from "@comps/Upload";
import { reqAddLesson } from "@api/edu/lesson";
import "./index.less";
//定义表单的布局选项
const layout = {
  labelCol: { span: 2 }, // label文字所占宽度比例
  wrapperCol: { span: 5 }, // 右边Input所占宽度比例
};
export default function AddLesson({ location, history }) {
  const onFinish = async (values) => {
    const chapterId = location.state._id;
    await reqAddLesson({ ...values, chapterId });
    message.success("添加课时成功");
    history.push("/edu/chapter/list");
  };
  const onBack = () => {
    history.push("/edu/chapter/list");
  };
  return (
    <Card
      title={
        <PageHeader
          className="add-lesson-header"
          onBack={onBack}
          title="新增课程"
        />
      }
    >
      <Form {...layout} onFinish={onFinish} initialValues={{ free: true }}>
        <Form.Item
          label="课时名称"
          name="title"
          rules={[{ required: true, message: "请输入课时名称~" }]} // 校验规则
        >
          <Input />
        </Form.Item>

        <Form.Item label="是否免费" name="free" valuePropName="checked">
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>

        <Form.Item
          name="video"
          rules={[{ required: true, message: "请上传视频" }]}
        >
          <Upload />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="add-lesson-btn">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
