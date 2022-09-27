import Cookies from "js-cookie";

const TokenKey = "adminToken";

export function getToken() {
  const token = localStorage.getItem(TokenKey);
  return token;
}

// export function setToken(token) {
//   return Cookies.set(TokenKey, token);
// }

export function removeToken() {
  localStorage.removeItem(TokenKey);
}
