import request from "@/utils/request";

export function loginAPI(data) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data,
  });
}

export function getInfoAPI() {
  return request({
    url: "/api/admin/whoami",
    method: "get",
  });
}
