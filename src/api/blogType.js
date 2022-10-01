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
    url: `/api/blog/${blogTypeId}`,
    method: "delete",
  });
}

/**
 * 添加博客分类
 * @returns {Promise}
 */
export function addBlogType(typeName, typeOrder) {
  return request({
    url: "/api/blogtype",
    method: "post",
    data: {
      name: typeName,
      order: typeOrder,
    },
  });
}

/**
 * 获取一个分类
 * @param {String} blogTypeId 要删除的分类id
 * @returns {Promise}
 */
 export function getOneBlogType(blogTypeId) {
    return request({
      url: `/api/blog/${blogTypeId}`,
      method: "get",
    });
  }