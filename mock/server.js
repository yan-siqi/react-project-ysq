const express = require("express");
const Mock = require("mockjs");
//创建app
const app = express();
//获取随机数
const Random = Mock.Random;
//获取随机标题
Random.ctitle();
//解析请求体数据的中间件
app.use(express.json())

//使用cors解决跨域问题
app.use((req, res, next) => {
  //设置响应头,一下内容允许跨域
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type,token");
  res.set("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  next(); //触发下一个中间件执行
});
//添加数据
app.post('/admin/edu/subject/save',(req,res,next)=>{
  const {title,parentId}=req.body//express不会解析请求体参数,需要使用中间件
  //返回响应数据
  res.json({
    code:20000,
    success:true,
    data:{
      _id:Date.now(),//用来保证数据是不同的
      title,
      parentId
    },
    message:''//返回失败的数据
  })
})
//请求二级分类(将二级分类 前提 保证能够随时命中)
app.get('/admin/edu/subject/get/:parentId',(req,res,next)=>{
  const {parentId}=req.params
  const total =Random.integer(0,5);
  const data = Mock.mock({
    total,
    [`items|${total}`]: [
      {
        //遍历一次加一
        "_id|+1": 100,
        title: "@ctitle(2,5)", //随机创建标题 长度范围(2,5)
        parentId, //父级分类id
      },
    ], //创建多少条数据,生成数组,长度为limit
  });
  if(total===1){
    data.items=[data.items]
  }
  //返回响应
  res.json({
    code: 20000, //陈功状态码
    success: true, //
    data, //响应的数据 客户端返回数据
    message: "", //错误的信息
  });
})
//只能接收get请求
app.get("/admin/edu/subject/:page/:limit", (req, res, next) => {
  //req=>请求数据,res=>响应对象,next 请求完成之后还能触发别的,实质上是默认一个处理
  //获取params参数 page:当前的页码,limit:每页限制的数量
  const { page, limit } = req.params;

  //模拟数据
  const data = Mock.mock({
    //此时数据都是随机的(后台没开发好时可以使用)
    total: Random.integer(+limit+1, limit * 2), //获取随机数(是整数)范围(最小值,最大值)
    [`items|${limit}`]: [
      {
        //遍历一次加一
        "_id|+1": 1,
        title: "@ctitle(2,5)", //随机创建标题 长度范围(2,5)
        parentId: 0, //父级分类id
      },
    ], //创建多少条数据,生成数组,长度为limit
  });
  //如果获取查询字符串的query参数
  //const {}=req.query此处不需要
  /*   const data = {
    total: 100,
    items: [{}, {}],
  }; */
  //返回响应
  res.json({
    code: 20000, //陈功状态码
    success: true, //
    data, //响应的数据 客户端返回数据
    message: "", //错误的信息
  });
});

//启动服务,设置端口号
app.listen(9000, "localhost", (err) => {
  if (err) {
    console.log("不好意思响应失败", err);
    return;
  }
  console.log("服务启动成功了,端口号9000监听中...");
});
/* 
笔记:

app.use() 件中间 代表接收所有服务
模拟请求 返回数据  <==>接口:http://47.103.203.152/admin/edu/subject/:page/:limit
get请求,:xxxparams参数

模拟数据:
一级分类id
{
    _id:1
    title:'xx'
    parentId:0//父级分类id
}
二级分类id
{
    _id:2
    title:'aaa'
    parentId:1//父级分类id
}

以上两种是一套
*/
