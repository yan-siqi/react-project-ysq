# day 02

## 获取二级分类列表数据

- ation:
  - 同步action(返回值是action对象)=>需要考虑redux要管理啥状态数据=>课程分类数据
  - 异步action(返回值是函数,以dispatch作为参数,内部执行异步代码)=>需要考虑对数据的操作=>对数据发请求获取数据/跟新数据/删除数据/添加数据
  - 判断是同步还是异步的根本:需不需要发送请求
  - 注意点**:正常的异步action是没有返回值的但是特殊情况:`export const getSubjectList = (page, limit) => {
  // 外面使用异步action时，异步action返回值是最里面函数的返回值
  return (dispatch) => {
    // 执行异步代码 --> 发送请求获取课程分类管理数据
    // return reqGetMenuList(page, limit) --> return有什么作用
    // return为了让外面能有返回值，从而根据返回值判断请求成功/失败
    return reqGetSubjectList(page, limit).then((response) => {
      // 更新redux状态数据
      dispatch(getSubjectListSync(response));
      // 让请求成功时，返回一个请求成功的数据
      return response.items;
    });
    // 以下写法外面使用时，没有返回值
    // reqGetSubjectList(page, limit).then((response) => {
    //   // 更新redux状态数据
    //   dispatch(getSubjectListSync(response));
    // });
  };
};`
    - 外边有返回值:外部想要使用内部的值时需要返回值,返回的是最里边函数的值(本质是promise),外边他通过返回值来判断请求是否会成功
    - 而内部的return返回一个状态的promise来传递给外部 ,判断请求是否成功
- constants:在其中定义并暴露action中使用的常量
- index: 用来汇总当前redux的所有内容,让外部使用更加方便,引入并暴露,状态数据和更新状态的方法
- reducer:根据之前的状态和action来生成新的状态
- 在src/edu/subject中添加接口请求函数获取数据
- 在自己mock的数据中模拟请求返回数据
  - 大致模板:
    - app.请求方式('请求路径',(req,res,next)=>{
      获取请求参数
      定义模拟数据
      返回响应数据
     }) 
  - 注意点:(express框架默认不解析请求体参数)
    - 解决使用解析POST/PUT请求的请求体参数的中间件(使用中间件代表接收所有请求)

## 添加组件的流程

- 创建组件
- 在config/asyncComps暴露出去（未来才能加载使用~）
- 配置权限（在页面菜单管理 / 课程分类管理 添加相应的权限）
- 在角色管理 / admin 添加相应的权限

## 出现的问题总结

- 问题：二级请求进不来
  - 分析原因:
  - 请求地址：
      /admin/edu/subject/1/10 --> 请求一级分类数据
      /admin/edu/subject/get/1 --> 请求二级分类数据
      以上两个地址都会命中：/admin/edu/subject/:page/:limit 后面路由就不会执行
      所以请求进不来
  - 解决：请求二级展开项必须放前面
- *问题 :展开第一项 展开第二项 关闭第二项 第一项数据发生了更新
- 原因：不管展开还是关闭都会触发 handleExpandedRowsChange
        [1, 2] --> [1] 就会拿着 1 重新发送请求，所以更新了第一项数据
- 解决：关键点：判断当前是 展开 还是 关闭~
  - 如果是展开，就要发送请求更新数据，还要更新expandedRowKeys
  - 如果是关闭，就只要更新expandedRowKeys，而不需要发送请求
    - 展开，长度会+1，而关闭，长度会-1
    - 当前expandedRowKeys --> this.state.expandedRowKeys
    - 最新expandedRowKeys --> 函数传入的参数

- 最后就是Subject/AddSubject/index.jsx中 一直报错误说
  - `<Option key={0} value="0">
              一级分类
            </Option>`
            {subjects.map((subject, index) => {
              return (`<Option key={index + 1} value={subject._id}>
                  {subject.title}
                </Option>`
  - subjects.map()不是一个方法,实际是subject有问题,解决:在Subject/redux/action.js中获取一级课程分类数据时候里边的return返回请求成功的数据:response.items

## 复习

- 显示二级菜单 
  - 属性expandable函数=>expandedRowKesy 决定谁(id唯一标识)展开,在当前组件中定义一个状态 只在自己组建中使用
  - 数据要动态请求:只要有children才会展开,所以需要添加children属性,会有展开的图标
  - 展开的时候才会发请求,闭合的时候不会发请求

- 添加
  - 在antd中 推荐使用工厂函数组件 来实现form表单