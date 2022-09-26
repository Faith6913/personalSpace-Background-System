import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: true }); // NProgress Configuration

// vue-element-admin 使用的时白名单鉴权法
// const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  const hasGetUserInfo = store.getters.user;
  if (to.meta.auth) {
    next();
    NProgress.done();
    // 这里要进的路由时需要鉴权的
    // if (hasGetUserInfo) {
    //   // localStorage里有adminToken, 需要检验是否有userInfo
    //   setTimeout(() => {
    //     next();
    //     NProgress.done();
    //   }, 3000);
    // } else {
    //   // localStorage里没有adminToken,需要进入登录页重新登录以获取token
    //   next(`/login?redirect=${to.path}`);
    //   NProgress.done();
    // }
  } else {
    // 该页面不需要鉴权

    // 需要先判断一下是否进的是login页面
    if (to.path === "/login") {
      // 如果是的话，需要看是否已经登陆，已登录则导航到首页，未登录则放行进入登录页面
      if (hasGetUserInfo.name) {
        next();
        NProgress.done();
      } else {
        if (hasToken) {
          console.log("需要恢复一下登录状态");
          await store.dispatch("user/getInfo", hasToken);
          next({ path: "/" });
          NProgress.done();
        } else {
          next();
          NProgress.done();
        }
      }
    } else {
      // 如果进的不是登录页面，直接放行
      next();
      NProgress.done();
    }
  }

  // 下方是vue-element-admin原来的鉴权流程
  // determine whether the user has logged in
  // const hasToken = getToken();
  // if (hasToken) {
  //   if (to.path === "/login") {
  //     // 如果要去的页面是登录页面，则直接放行
  //     next({ path: "/" });
  //     NProgress.done();
  //   } else {
  //     // 进的不是登录页面
  //     // 看一下本地是否有用户信息
  //     const hasGetUserInfo = store.getters.name;
  //     console.log(store.getters);
  //     if (hasGetUserInfo) {
  //       next();
  //     } else {
  //       // 没有用户信息，但是又token,接下来就是用localstorage里面的token去服务器拿用户信息
  //       try {
  //         // 获取用户信息，这里需要写一下getInfo的actions
  //         await store.dispatch("user/getInfo");
  //         // 没有发生错误，就直接放行就可
  //         next();
  //       } catch (error) {
  //         // 进入了catch捕获到错误，则需要重置token并导航到登录页面
  //         await store.dispatch("user/resetToken");
  //         Message.error(error || "Has Error");
  //         next(`/login?redirect=${to.path}`);
  //         NProgress.done();
  //       }
  //     }
  //   }
  // } else {
  //   /* 没有 token*/
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // 如果在白名单中，直接放行
  //     next();
  //   } else {
  //     // 要进的页面没有在白名单里边，需要进入鉴权流程
  //     next(`/login?redirect=${to.path}`);
  //     NProgress.done();
  //   }
  // }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
