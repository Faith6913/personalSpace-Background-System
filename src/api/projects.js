/* 
    与项目有关的Ajax接口
    token已经在请求拦截中自动添加到请求头中了
*/
import request from "@/utils/request";

/**
 * 获取全部项目
 * @returns
 */
export function getProjects() {
  return request({
    url: "/api/project",
    method: "get",
  });
}

/**
 * 添加项目
 * @param {Object} data 要添加的项目信息对象
 * @returns
 */
export function addProject(data) {
  return request({
    url: "/api/project",
    method: "post",
    data,
  });
}

/**
 * 根据项目 id 删除项目
 * @param {String} projectId
 * @returns
 */
export function deleteProject(projectId) {
  return request({
    url: `/api/project/${projectId}`,
    method: "delete",
  });
}

/**
 * 修改项目相关信息
 * @param {String} projectId
 * @param {Object} data
 * @returns
 */
export function modifyProject(projectId, data) {
  return request({
    url: `/api/project/${projectId}`,
    method: "put",
    data,
  });
}
