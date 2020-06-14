import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button, message } from "antd";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl"; //引入国际化插件
import { reqGetAllTeacherList } from "@api/edu/teacher";
import { reqGetAllSubjectList, reqGetSubSubjectList } from "@api/edu/subject";
import { getCourseList } from "../../redux";
import "./index.less";
const { Option } = Select;
function SearchForm({ getCourseList, getSearchFormData }) {
  const intl = useIntl(); //定义国际化
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  console.log(subjects);

  useEffect(() => {
    //异步同时请求所有数据
    const fetchData = async () => {
      const [teachers, subjects] = await Promise.all([
        reqGetAllTeacherList(), //讲师数据
        reqGetAllSubjectList(), //获取一级分类数据
      ]);
      setTeachers(teachers);

      const data = subjects.map((subject) => {
        return {
          value: subject._id, //被选中的值
          label: subject.title, //显示名称
          isLeaf: false, //是否请求三级菜单选项
        };
      });
      setSubjects(data);
    };
    fetchData();
  }, []);
  const [options, setOptions] = useState([
    {
      value: "zhejiang",
      label: "Zhejiang",
      isLeaf: false,
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      isLeaf: false,
    },
  ]);
  const onChange = (value, selectedOptions) => {};
  //点击一级菜单,调用获取二级菜单的回调函数
  const loadData = async (selectedOptions) => {
    //selectedOptions是代表当前选中的菜单
    //如果当前是二级菜单:[{}]=>说明里边的对象是一级菜单
    //如果当前是三级级菜单:[{}]=>说明里边的对象是一级菜单,和二级菜单
    //总结:当前点击的菜单是数组的最后一个对象数据
    const targetOption = selectedOptions[selectedOptions.length - 1]; //获取当前点击的菜单选项数据
    //添加加载属性
    targetOption.loading = true;
    const { items } = await reqGetSubSubjectList(targetOption.value); //加载二级菜单数据
    targetOption.loading = false; //等数据加载完成之后取消加载
    if (items.length) {
      targetOption.children = items.map((item) => {
        //targetOption=>一级菜单数据 targetOption是二级菜单数据
        return {
          value: item._id,
          label: item.title,
        };
      });
    } else {
      targetOption.isLeaf = true;
    }
    //更新页面:es6类组件=>this.setState 工厂函数组件:=>const [value, setValue] = useState() --> setValue()
    setSubjects([...subjects]); //保证页面更新
  };
  const resetForm = () => {
    form.resetForm = () => {
      form.resetFields(); //重置表单数据
    };
  };
  const onFinish = async (values) => {
    const { title, teacherId, subject = [] } = values;
    let subjectId, subjectParentId;
    if (subject.length === 1) {
      //有一个值 说明是一级分类
      subjectParentId = "0";
      subjectId = subject[0];
    } else if (subject.length === 2) {
      //有两个值说明是二级分类
      subjectParentId = subject[0];
      subjectId = subject[1];
    }
    await getCourseList({
      title,
      teacherId,
      page: 1,
      limit: 10,
      subjectId,
      subjectParentId,
    }); //请求获取要查询的数据
    //调用父组件的额方法,给父组件传递数据  props
    getSearchFormData({ title, teacherId, subjectId, subjectParentId });
    //提示文本
    message.success("成功查询到课程分类数据...");
  };
  return (
    <Form layout="inline" form={form} onFinish={onFinish }>
      <Form.Item name="title" label={intl.formatMessage({ id: "title" })}>
        <Input
          placeholder={intl.formatMessage({id:'title'})}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={<FormattedMessage id="teacher" />}
          style={{ width: 250, marginRight: 20 }}
        >
          {teachers.map((teacher) => {
            return (
              <Option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id="subject" />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjects}
          loadData={loadData}
          changeOnSelect
          placeholder={intl.formatMessage({
            id: "subject",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
            <FormattedMessage id="searchBtn" />
        </Button>
        <Button onClick={resetForm}>
        <FormattedMessage id="resetBtn" />
        </Button>
      </Form.Item>
    </Form>
  );
}
export default connect(null,{getCourseList})(SearchForm)
