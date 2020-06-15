import React from "react";
import { Row, Col } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { AreaChart } from "bizcharts";
import Card from "@comps/Card";
import './index.less'
const layout = { xs: 24, sm: 12, md: 12, lg: 6 };//栅格布局
const data = [
  { year: "2001", value: 3 },
  { year: "2005", value: 8 },
  { year: "2008", value: 4 },
  { year: "2009", value: 9 },
  { year: "2010", value: 1 },
  { year: "2011", value: 2 },
  { year: "2012", value: 6 },
  { year: "2013", value: 4 },
];//图表数据
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
                周同比12%
                <CaretUpOutlined style={{ color: "red" }} />
              </span>
              <span>
                日同比12%
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
                forceFit
                xField="year"
                yField="value"
                smooth
                color="pink"
                xAixs={{ visible: false }}
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
          content="content"
          footer="转化率60%"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="运营结果"
          number="123456789"
          content="content"
          footer="周同比12%"
        />
      </Col>
    </Row>
  );
}
