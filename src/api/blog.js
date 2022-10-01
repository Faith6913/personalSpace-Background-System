import request from "@/utils/request";
// 按分页获取文章内容
export function getBlog(page = 1, limit = 5) {
  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

// 设置首页标语
// export function setBanner(data) {
//   return request({
//     url: "/api/banner",
//     method: "post",
//     data,
//   });
// }
