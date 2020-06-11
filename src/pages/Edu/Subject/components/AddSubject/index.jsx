import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSubjectList } from "../../redux";
import { reqAddSubject } from "@api/edu/subject";
import "./index.less";
//使用useState状态
const { Option } = Select;
let page = 1;
function AddSubject({ total, getSubjectList, history }) {
  const [subjects, setSubjects] = useState([]);
  //console.log(subjects)
  //表单校验成功
  const onFinish = async (values) => {
    const { title, parentId } = values;
    await reqAddSubject(title, parentId);
    message.success("添加数据成功");
    history.push("/edu/subject/list"); //添加成功后进行路由跳转
  };
  //失败内部进行处理
  //const onFinishFailed = () => {};
  //定义工厂函数组件
  useEffect(() => {
    page=1;//下次再访问重新进来 不会重复加载
    const fetchData = async () => {
      const items = await getSubjectList(page++, 10);
      //更新状态
      setSubjects(items);
    };
    fetchData();
  }, [getSubjectList]); //其中有两个参数,第一个参数传回调函数,第二个参数传空数组 相当于componentdidmount
  //表单的布局选项
  const layout = {
    labelCol: { span: 2 }, //左边文字占宽度的比例
    wrapperCol: { span: 5 }, //右边输入框所占的比例
    //在antd中将整个行 分成24等分
  };
  //加载更多数据
  //但是请求到一定程度之后不能再继续加载
  //极限:total 并且不能超过总的长度subject.length
  const loadMore = async () => {
    const items = await getSubjectList(page++, 10);
    //更新状态
    setSubjects([...subjects, ...items]); //之前的数据和刚加载出来的数据
  };
  return (
    <Card
      title={
        <>
          <Link to="/edu/subject/list">
            <ArrowLeftOutlined />
          </Link>
          <span className="title">添加课程类别</span>
        </>
      }
    >
      <Form
        {...layout}
        onFinish={onFinish}  
      >
        <Form.Item
          label="课程类别名称"
          name="title"
          rules={[{ required: true, message: "请输入课程类别名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="父级分类"
          name="parentId"
          rules={[{ required: true, message: "请选择父级分类" }]}
        >
          <Select
            dropdownRender={(menu) => (
              <div>
                {menu}
                {total <= subjects.length ? (
                  "没有更多数据了"
                ) : (
                  <Button type="link" onClick={loadMore}>
                    点击加载更多数据
                  </Button>
                )}
              </div>
            )}
          >
            <Option key={0} value="0">
              一级分类
            </Option>
            {subjects.map((subject, index) => {
              return (
                <Option key={index + 1} value={subject._id}>
                  {subject.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default connect(
  (state) => ({
    total: state.subjectList.total,
  }),
  {
    getSubjectList,
  }
)(AddSubject);
