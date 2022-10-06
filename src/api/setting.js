import request from "@/utils/request";

/**
 * 获取全局设置
 * @returns
 */
export function getSetting() {
  return request({
    url: "/api/setting",
    method: "get",
  });
}

/**
 * 修改全局设置
 * @param {Object} data
 *  {
 *    "avatar": "http://www.duyiedu.com/source/img/logo.png",
 *    "siteTitle": "志浩的个人空间",
 *    "github": "https://github.com/Faith6913",
 *    "qq": "1728935296",
 *    "qqQrCode": "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
 *    "weixin": "yh777bao",
 *    "weixinQrCode": "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
 *    "mail": "3263023350@qq.com",
 *    "icp": "黑ICP备17001719号",
 *    "githubName": "DuYi-Edu",
 *    "favicon": "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
 *    "id": "60855b153f14710597577f1a"
 *  }
 * @returns
 */
export function setSetting(data) {
  return request({
    url: "/api/setting",
    method: "put",
    data,
  });
}
