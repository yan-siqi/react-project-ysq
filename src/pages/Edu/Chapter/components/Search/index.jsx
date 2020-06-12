import React, { useEffect } from "react";
import { Select, Button, Form, message } from "antd";
import { connect } from "react-redux";
import { getAllCourseList, getChapterList } from "../../redux";
import "./index.less";
/* 
课下补充
*/
const { Option } = Select;
function Search({ getAllCourseList, allCourseList, getChapterList }) {
  const [form] = Form.useForm(); //form组件提供钩子函数hooks函数
  const finish = async ({ courseId }) => {
    await getChapterList({ page: 1, limit: 10, courseId });
    message.success("成功获取课时数据...");
  };
  const resetForm = () => {
    form.resetFields(); //将所有表单项重置
    //form.resetFields(['title']); //查询对应的表单项
  };
  //console.log(allCourseList);

  useEffect(() => {
    getAllCourseList();
  }, [getAllCourseList]);
  return (
    <Form
      onFinish={finish}
      layout="inline"
      className="chapter-search"
      form={form}
    >
      <Form.Item
        lable="选择课程"
        name="courseId"
        rules={[{ required: true, message: "请选择课程" }]}
      >
        <Select placeholder="请你选择课程" className="chapter-search-select">
          {allCourseList.map((course) => {
            return (
              <Option key={course._id} value={course._id}>
                {course.title}
              </Option>
            );
          })}
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
    getChapterList,
  }
)(Search);
