/* 获取七牛云的上传凭证 */
import request from "@utils/request";
export function reqGetUploadToken() {
  return request({
    url: `/uploadtoken`,
    method: "GET",
  });
}
