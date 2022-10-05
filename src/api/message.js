import request from "@/utils/request";

/**
 *分页获取留言
 * @param {Number} page
 * @param {Number} limit
 * @param {String} blogId 博客id，此值有就获取该博客下的评论，没有就获取全部评论
 * @returns
 */
export function getMessages(page = 1, limit = 10, blogId = -1) {
  return request({
    url: "/api/message",
    method: "get",
    params: {
      page,
      limit,
      blogId,
    },
  });
}

/**
 * 添加一条留言
 * @param {Object} data
 * {
        "nickname": "刚子",
        "content": "看看带博客id的有没有用",
    } 
 * @returns 
 */
export function addMessage(data) {
  return request({
    url: "/api/message",
    method: "post",
    data,
  });
}

/**
 * 根据留言id删除留言
 * @param {String} messageId
 * @returns
 */
export function deleteMessage(messageId) {
  return request({
    url: `/api/message/${messageId}`,
    method: "delete",
  });
}
