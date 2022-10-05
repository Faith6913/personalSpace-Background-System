import request from "@/utils/request";

/**
 *分页获取评论
 * @param {Number} page
 * @param {Number} limit
 * @param {String} blogId 博客id，此值有就获取该博客下的评论，没有就获取全部评论
 * @returns
 */
export function getComments(page = 1, limit = 10, blogId = -1) {
  return request({
    url: "/api/comment",
    method: "get",
    params: {
      page,
      limit,
      blogId,
    },
  });
}

/**
 * 添加一条评论
 * @param {Object} data
 * {
        "nickname": "刚子",
        "content": "看看带博客id的有没有用",
        "blogId": "6338f7b089d52a2dc48ff1bc"
    } 
 * @returns 
 */
export function addComment(data) {
  return request({
    url: "/api/comment",
    method: "post",
    data,
  });
}

/**
 * 根据评论id删除评论
 * @param {String} commentId
 * @returns
 */
export function deleteComment(commentId) {
  return request({
    url: `/api/comment/${commentId}`,
    method: "delete",
  });
}
