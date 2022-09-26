import request from "@/utils/request";

export function loginAPI(data) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data,
  });
}

export function getInfoAPI(token) {
  console.log(token);
  return request({
    url: "/api/admin/whoami",
    method: "get",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// export function logout() {
//   return request({
//     url: "/vue-admin-template/user/logout",
//     method: "post",
//   });
// }
