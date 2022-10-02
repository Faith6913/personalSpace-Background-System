// 与博客分类相关的接口函数
import request from "@/utils/request";

/**
 * 获取博客分类
 * @returns {Promise}
 */
export function getBlogType() {
  return request({
    url: "/api/blogtype",
    method: "get",
  });
}

/**
 * 删除博客分类
 * @param {String} blogTypeId 要删除的分类id
 * @returns {Promise}
 */
export function deleteBlogType(blogTypeId) {
  return request({
    url: `/api/blogtype/${blogTypeId}`,
    method: "delete",
  });
}

/**
 * 添加博客分类
 * @param {Object} data
 * @returns
 */
export function addBlogType(data) {
  return request({
    url: "/api/blogtype",
    method: "post",
    data,
  });
}

/**
 * 修改文章分类
 * @param {String} blogTypeId 
 * @param {Object} data 
 * @returns 
 */
export function modifyBlogType(blogTypeId, data) {
  return request({
    url: `/api/blogtype/${blogTypeId}`,
    method: "put",
    data,
  });
}

/**
 * 获取一个分类
 * @param {String} blogTypeId 要删除的分类id
 * @returns {Promise}
 */
export function getOneBlogType(blogTypeId) {
  return request({
    url: `/api/blogtype/${blogTypeId}`,
    method: "get",
  });
}
