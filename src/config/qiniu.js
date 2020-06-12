import * as qiniu from "qiniu-js";//引入七牛云中的所有 并重新命名为qiniu
export default {
  region: qiniu.region.z1,
  prefix_url: "http://qbslyqaii.bkt.clouddn.com/",
};
/* 
qiniu.region.z0: 代表华东区域
qiniu.region.z1: 代表华北区域
qiniu.region.z2: 代表华南区域
qiniu.region.na0: 代表北美区域
qiniu.region.as0: 代表东南亚区域

*/
