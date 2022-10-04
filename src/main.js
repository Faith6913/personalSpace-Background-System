import Vue from "vue";

import "nprogress/nprogress.css";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import locale from "element-ui/lib/locale/lang/en"; // lang i18n
import zhLocale from "element-ui/lib/locale/lang/zh-CN"; //引入中文版

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control
import "@/assets/icons/iconfont.css";
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI, { zhLocale });
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});

// 测试博客分类接口
// import { getBlogType, addBlogType } from "@/api/blogType";

// getBlogType().then((resp) => {
//   console.log(resp);
// });

// 测试一下项目接口
import {
  getProjects,
  addProject,
  deleteProject,
  modifyProject,
} from "./api/projects";
// addProject({
//   description: ["知识点: aaaa", "sdsadas"],
//   name: "测试项目接口的项目",
//   url: "http://www.demo.com/test",
//   github: "https://github.com/DuYi-Edu/test",
//   thumb: "https://avatars.githubusercontent.com/u/123123",
//   order: 2,
// }).then(({ data }) => {
//   console.log("添加项目：", data);
//   getProjects().then(({ data }) => {
//     console.log("全部项目：", data);
//   });
// });
// deleteProject("633ac423fbe74a27e007e98b").then(({ data }) => {
//   console.log("删除项目：", data);
//   getProjects().then(({ data }) => {
//     console.log("全部项目：", data);
//   });
// });
// modifyProject("633ac46ffbe74a27e007e994", {
//   description: ["知识点: aaaa", "sdsadas"],
//   name: "测试项目修改项目接口2222",
//   url: "http://www.demo.com/test",
//   github: "https://gasdasdi-Edu/test",
//   thumb: "httpsfsasas.githubusercontent.com/u/123123",
//   order: 2,
// }).then(({ data }) => {
//   console.log("修改项目:", data);
//   getProjects().then(({ data }) => {
//     console.log("全部项目：", data);
//   });
// });
