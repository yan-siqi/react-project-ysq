import React from "react";
import { Row, Col,Progress } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { AreaChart, ColumnChart } from "bizcharts";
import Card from "@comps/Card";
import "./index.less";
const layout = { xs: 24, sm: 12, md: 12, lg: 6 }; //栅格布局
const data = [
  { year: "1991", value: 3 },
	{ year: "1992", value: 10 },
	{ year: "1993", value: 15 },
	{ year: "1994", value: 5 },
	{ year: "1995", value: 4.9 },
	{ year: "1996", value: 10 },
	{ year: "1997", value: 4 },
	{ year: "1998", value: 9 },
	{ year: "1999", value: 13 },
]; //图表数据
const barData = [
	{
		type: "家具家电",
		sales: 38,
	},
	{
		type: "粮油副食",
		sales: 52,
	},
	{
		type: "生鲜水果",
		sales: 61,
	},
	{
		type: "美容洗护",
		sales: 145,
	},
	{
		type: "母婴用品",
		sales: 48,
	},
	{
		type: "进口食品",
		sales: 38,
	},
	{
		type: "食品饮料",
		sales: 38,
	},
	{
		type: "家庭清洁",
		sales: 38,
	},
	{
		type: "移动电脑",
		sales: 28,
	},
	{
		type: "品牌手机",
		sales: 58,
	},
];//柱状图数据
export default function Visits() {
  return (
    <Row gutter={16}>
      <Col {...layout}>
        <Card
          title="总销售额"
          number="123456789"
          content={
            <>
              <span>
                周同比12% &nbsp;
                <CaretUpOutlined style={{ color: "red" }} />
              </span>
              <br></br>
              <span>
                日同比12% &nbsp;
                <CaretDownOutlined style={{ color: "green" }} />
              </span>
            </>
          }
          footer="日销售额￥1234"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="访问量"
          number="123456789"
          content={
            <div className="charts-container ">
              <AreaChart
                data={data}
                meta={{ value:{alias:'值'}}} //给数据字段配置别名
                forceFit
                xField="year" //x轴加载数据的字段
                yField="value" //y轴加载数据的字段
                smooth
                color="blue"
                xAxis={{ visible: false }}
                yAxis={{ visible: false }}
               
              />
            </div>
          }
          footer="日销售额￥1234"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="支付笔数"
          number="123456789"
          content={
            <ColumnChart
              data={barData}
              forceFit
              padding="0"
              xField="type"
              yField="sales"
              meta={{
                type: {
                  alias: "类别",
                },
                sales: {
                  alias: "销售额(万)",
                },
              }}
              xAxis={{ visible: false }}
              yAxis={{ visible: false }}
            />
          }
          footer="转化率60%"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="运营结果"
          number="123456789"
          content={
            <Progress
              storkColor={{
                //颜色渐变
                "0%": "#108ee9",
                "100%": "green",
              }}
              percent={60}
              status="active"
            />
          }
          footer="周同比12%"
        />
      </Col>
    </Row>
  );
}
