import React, { useEffect } from "react";
import { Select, Button, Form } from "antd";
import { connect } from "react-redux";
import { getAllCourseList } from "../../redux";
import "./index.less";
/* 
课下补充
*/
const { Option } = Select;
function Search({ getAllCourseList, allCourseList }) {
  const [form] = Form.useForm(); //form组件提供钩子函数hooks函数
  const finish = () => {};
  const resetForm = () => {
    form.resetFields(); //将所有表单项重置
  };
  useEffect(() => {
    getAllCourseList();
  }, [getAllCourseList]);
  return (
    <Form onFinish={finish} layout="inline" className="chapter-search" form={form}>
      <Form.Item
        lable="选择课程"
        name="title"
        rules={[{ required: true, message: "请选择课程分类" }]}
      >
        <Select
          placeholder="请你选择课程分类"
          className="chapter-search-select"
        >
          {allCourseList.map((course) => {
            return (
              <Option key={course._id} value={course._id}>
                {course.title}
              </Option>
            );
          })}
          {/* <Option key="1" value="1">
            1
          </Option>
          <Option key="2" value="2">
            2
          </Option>
          <Option key="=3" value="3">
            3
          </Option> */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询章节
        </Button>
        <Button className="subject-btn" onClick={resetForm}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}
export default connect(
  (state) => ({
    allCourseList: state.chapter.allCourseList,
  }),
  {
    getAllCourseList,
  }
)(Search);
