import request from "@/utils/request";

/**
 * 获取关于我的url地址
 * @returns
 */
export function getAbout() {
  return request({
    url: "/api/about",
    method: "get",
  });
}

/**
 * 设置关于我的url地址
 * @param {Object} data
 * {
        "url": "https://www.github.com/Faith6913",
    } 
 * @returns 
 */
export function setAboutUrl(data) {
  return request({
    url: "/api/about",
    method: "post",
    data,
  });
}
