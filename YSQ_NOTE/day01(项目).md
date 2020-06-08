# day01

## git版本控制

### 本地没有仓库,需要创建

- git init 初始化本地仓库
- git add . / git commit -m '' 本地版本控制
- git remote add origin xxx 关联远程仓库
- git push -u origin master 推送分支（首次）
- git checkout -b xxx 新建并切换分支
- git push origin xxx 推送分支

### 需要拉取别人的代码

- git clone +仓库地址
- cd + 仓库名  =>进入到仓库里边
- git fetch origin 分支名a:分支名a 拉取远程仓库的a分支到自己的a分支 
- git checkout a 此时要切换到a 分支
- 如果更新远端a分支代码:git pull origin a

## 开发组件的流程

- 自定义组件
- 在 src/config/asyncComps 中引入组件并暴露
- 在页面中，权限管理/菜单管理 添加指定菜单
- 在页面中，权限管理/角色管理 给当前角色(admin)设置可访问组件权限

## react 项目预热

- 技术选型:可以通过参考package.json 来确定
- 接口:简单来讲是请求地址(请求参数,请求方式,请求数据...)
  - 测试接口:测试检查接口是否和接口文档描述的是否一致(地址,请求方式,请求参数,请求方式,返回的数据...)
  - 小问题自己解决,大方向有问题找后台协商/问领导
  - 会遇到的问题:
    - 前台工作完成后台没有提供接口的话,可以自己模拟数据(尽量不要是纯静态数据)
    - 模拟数据:`http://mockjs.com/`
    - 例如:`//模拟数据 const data = Mock.mock({
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
       });`
    - 注意常用的ui组件要查看文档直接粘改

## subject

- 搭建静态组件
  - 注意使用第三方组件一定要引入
  - 引入顺序:第三方插件->自己定义的组件->样式文件 
- 请求数据
- 发请求获取数据:`const result = await reqGetSubjectList(page, limit);`
- 更新数据:`使用this.setState()`来进行数据更新
- 数据的分页展示:(笔记暂不整理...)

## 创建服务(偏向于后台)

- 可以创建随机类来模拟数据
- 创建app应用对象
- 使用use方法来接收所有请求
- 使用cores解决跨域
- 获取请求参数const{xxx,yyy}=req.params  =>:ccc的形式 获取query参数/查询字符串的参数 同上const{aaa}=req.query
- 返回响应数据
- res.json({}) =>参考接口文档(线上的接口文档/word版本)
- 设置监听端口号 并将服务启动