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

/**
 * 根据博客 id 删除博客接口
 * @param {String} blogId 
 * @returns 
 */
export function deleteBlog(blogId) {
  return request({
    url: `/api/blog/${blogId}`,
    method: "delete",
  });
}
/**
 * 发布博客接口
 * @param {Object} data 博客文章对象
 * @returns 
 */
export function postBlog(data) {
  return request({
    url: "/api/blog",
    method: "post",
    data,
  });
}
