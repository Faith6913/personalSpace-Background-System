import { loginAPI, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";
const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  };
};

const state = getDefaultState();

const mutations = {
  // RESET_STATE: (state) => {
  //   Object.assign(state, getDefaultState());
  // },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  // SET_NAME: (state, name) => {
  //   state.name = name;
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar;
  // },
  SET_USER: (state, payLoad) => {
    state.user = payLoad;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    // userInfo 是用户提交的数据，接下来就需要将userInfo发送到服务器
    // console.log(userInfo);

    return new Promise((resolve, reject) => {
      loginAPI(userInfo)
        .then((resp) => {
          const { code, data } = resp;
          if (code === 0) {
            if (data !== null) {
              // code 为 0 并且data 不是null, 登陆成功
              commit("SET_USER", data);
              commit("SET_TOKEN", localStorage.getItem("adminToken"));
              resolve(data);
            } else {
              reject("账号密码不正确");
            }
          } else {
            reject("验证码不正确");
          }
        })
        .catch((error) => {
          console.log("error:::", error);
          reject(error);
        });
    });
    // const { username, password } = userInfo;
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password })
    //     .then((response) => {
    //       const { data } = response;
    //       console.log(response);
    //       commit("SET_TOKEN", data.token);
    //       setToken(data.token);
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { data } = response;

          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
