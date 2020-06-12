import React, { Component } from "react";
import { Button, Upload as AntdUpload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as qiniu from "qiniu-js"; //通过七牛云来上传sdk 获取qiniu-js中的所有数据,并重命名为qiniu
import { nanoid } from "nanoid"; //生成唯一的id数据
import { reqGetUploadToken } from "@api/edu/upload";
import qiniuConfig from "@conf/qiniu"; //自己封装的qiniu配置
const MAX_VIDEO_SIZE = 35 * 1024 * 1024; //设置上传的图片大小不大于35mb
export default class Upload extends Component {
  //从本地读取uploadtoken数据
  getUploadToken = () => {
    try {
      //读取数据成功并解析成对象数据'=>解析成功
      const { uploadToken, expires } = JSON.parse(
        localStorage.getItem("upload_token")
      );
      //判断本地token是否过期
      if (!this.isValidUploadToken(expires)) {
        throw new Error("本地token过期了...");
      }
      return {
        uploadToken,
        expires,
      };
    } catch {
      //解析失败
      return {
        uploadToken: "",
        expires: 0,
      };
    }
  };
  //状态数据初始化
  state = {
    ...this.getUploadToken(), //重新获取数据
    isUploadSuccess: false, //上传是否成功
  };
  fetchUploadToken = async () => {
    const { uploadToken, expires } = await reqGetUploadToken(); //重新发请求获取token数据
    this.saveUploadToken(uploadToken, expires); //将token数据进行保存
  };
  //需要判断uploadtoken是否有效 true =>有效 反之无效
  isValidUploadToken = (expires) => {
    return expires > Date.now(); //判断当前时间和开始存储的过期时间 如果小于就是没过期反之就是过期了
  };
  //保存token数据'
  saveUploadToken = ( uploadToken,expires) => {
    const data = {
      uploadToken,
      expires: Date.now() + expires * 1000 - 5 * 60 * 1000, //设置过期时间:(保证提前五分钟进行刷新) 当前时间+俩小时的秒数-5分钟转化成秒
    };
    //更新状态
    this.setState(data);
    //数据进行持久化存储
    localStorage.setItem("upload_token", JSON.stringify(data));
  };
  //在上传之前需要触发的函数
  beforeUpload = (file, fileList) => {
    //file(当前上传的文件) filelist(上传的文件列表)
    //返回值是false/reject就会终止上传,如果是其他情况就继续上传
    return new Promise(async (resolve, reject) => {
      if (file.size > MAX_VIDEO_SIZE) {
        message.error("上传视频太大...");
        return reject(); //不符合要求停止上传
      }
      //上传之前检查凭证是否过期
      const { expires } = this.state;
      if (!this.isValidUploadToken(expires)) {
        await this.fetchUploadToken(); //如果上传的凭证过期,重新发送请求
      }
      //文件符合要求
      resolve(file); //fiel作为要上传的我呢间,进行上传
    });
  };
  //自定义上传视频方案
  customRequest = ({ file, onProgress, onSuccess, onError }) => {
    const { uploadToken } = this.state;
    const key = nanoid(10); // 生成长度为10随机id，并且一定会保证id是唯一的
    const putExtra = {
      fname: "", // 文件原名称
      mimeType: ["video/mp4"], // 用来限定上传文件类型
    };
    const config = {
      region: qiniuConfig.region,
    };
    //创建上传文件对象
    const observable = qiniu.upload(
      file, // 上传的文件
      key, // 上传的文件新命名（保证唯一性）
      uploadToken, // 上传凭证
      putExtra,
      config
    );
    //创建上传中触发的回调函数
    const observer = {
      next(res) {
        const percent = res.total.percent.toFixed(2); //进度加载百分比 精确到小数据点后两位
        onProgress({ percent }, file);
      },
      error(err) {
        onError(err); //视频上传失败
        message.error("视频上传失败");
      },
      complete: (res) => {
        onSuccess(res);
        console.log(res);
        
        message.success("视频上传成功");
        const video = qiniuConfig.prefix_url + res.key; //此时打印res获取哈希值
        this.props.onChange(video); //onChange是Form.Item传入的，当你调用传入值时。这个值就会被Form收集
        this.setState({
          isUploadSuccess: true, //将按钮隐藏
        });
      },
    };
    //开始上传
    this.subscription = observable.subscribe(observer);
  };
  componentWillUnmount() {
    //在组件卸载的时候取消上传视频
    this.subscription && this.subscription.unsubscribe();
    this.props.onChange("");
    this.setState({
      isUploadSuccess: false, //将按钮显示
    });
  }
  render() {
    const { isUploadSuccess } = this.state;
    return (
      <AntdUpload
        accept="video/mp4" // 决定上传选择的文件类型
        listType="picture"
        beforeUpload={this.beforeUpload}
        customRequest={this.customRequest}
        onRemove={this.remove}
      >
        {isUploadSuccess ? null : (
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        )}
      </AntdUpload>
    );
  }
}
