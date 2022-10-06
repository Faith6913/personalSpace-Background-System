import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "控制台", icon: "dashboard", auth: true },
      },
    ],
  },
  {
    path: "/banner",
    component: Layout,
    children: [
      {
        path: "banner",
        name: "banner",
        component: () => import("@/views/banner/index"),
        meta: { title: "首页标语", icon: "el-icon-s-home", auth: true },
      },
    ],
  },
  {
    path: "/blogManagement",
    component: Layout,
    redirect: "/blogManagement/blogList",
    name: "blogManagement",
    meta: { title: "文章管理", icon: "el-icon-document", auth: true },
    children: [
      {
        path: "/blogList",
        name: "blogList",
        component: () => import("@/views/blogList/index"),
        meta: {
          title: "文章列表",
          icon: "el-icon-document-checked",
          auth: true,
        },
      },
      {
        path: "/blogCategory",
        name: "blogCategory",
        component: () => import("@/views/blogCategory/index"),
        meta: { title: "文章分类", icon: "el-icon-menu", auth: true },
      },
      {
        path: "/blogAdd",
        name: "blogAdd",
        component: () => import("@/views/blogAdd/index"),
        meta: { title: "添加文章", icon: "el-icon-document-add", auth: true },
      },
      {
        path: "/blogEdit/:id",
        name: "blogEdit",
        component: () => import("@/views/editBlog/index"),
        hidden: true,
        meta: { title: "编辑文章", icon: "", auth: true },
      },
    ],
  },
  {
    path: "/projectManagement",
    component: Layout,
    redirect: "/projectManagement/projectList",
    name: "projectManagement",
    meta: { title: "项目管理", icon: "el-icon-share", auth: true },
    children: [
      {
        path: "projectList",
        name: "projectList",
        component: () => import("@/views/projectList/index"),
        meta: { title: "项目列表", icon: "el-icon-notebook-2", auth: true },
      },
      {
        path: "projectAdd",
        name: "projectAdd",
        component: () => import("@/views/projectAdd/index"),
        meta: { title: "添加项目", icon: "el-icon-link", auth: true },
      },
    ],
  },
  {
    path: "/commentManage",
    component: Layout,
    children: [
      {
        path: "commentManage",
        name: "commentManage",
        component: () => import("@/views/commentManage/index"),
        meta: {
          title: "评论管理",
          icon: "el-icon-chat-line-square",
          auth: true,
        },
      },
    ],
  },

  {
    path: "/message",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Message",
        component: () => import("@/views/message/index"),
        meta: { title: "留言板", icon: "el-icon-copy-document", auth: true },
      },
    ],
  },
  {
    path: "/about",
    component: Layout,
    children: [
      {
        path: "about",
        name: "about",
        component: () => import("@/views/about/index"),
        meta: { title: "关于我", icon: "el-icon-user", auth: true },
      },
    ],
  },
  {
    path: "/setting",
    component: Layout,
    children: [
      {
        path: "setting",
        name: "setting",
        component: () => import("@/views/setting/index"),
        meta: { title: "设置", icon: "el-icon-s-tools", auth: true },
      },
    ],
  },

  {
    path: "/personalSetting",
    redirect: "/personalSetting",
    component: Layout,
    children: [
      {
        path: "",
        name: "personalSetting",
        component: () => import("@/views/personalSetting/index"),
        meta: { title: "个人中心", icon: "", auth: true },
        hidden: true,
      },
    ],
  },
  // {
  //   path: "/form",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       name: "Form",
  //       component: () => import("@/views/form/index"),
  //       meta: { title: "form", icon: "form" },
  //     },
  //   ],
  // },
  // {
  //   path: "/nested",
  //   component: Layout,
  //   redirect: "/nested/menu1",
  //   name: "Nested",
  //   meta: {
  //     title: "Nested",
  //     icon: "nested",
  //   },
  //   children: [
  //     {
  //       path: "menu1",
  //       component: () => import("@/views/nested/menu1/index"), // Parent router-view
  //       name: "Menu1",
  //       meta: { title: "Menu1" },
  //       children: [
  //         {
  //           path: "menu1-1",
  //           component: () => import("@/views/nested/menu1/menu1-1"),
  //           name: "Menu1-1",
  //           meta: { title: "Menu1-1" },
  //         },
  //         {
  //           path: "menu1-2",
  //           component: () => import("@/views/nested/menu1/menu1-2"),
  //           name: "Menu1-2",
  //           meta: { title: "Menu1-2" },
  //           children: [
  //             {
  //               path: "menu1-2-1",
  //               component: () =>
  //                 import("@/views/nested/menu1/menu1-2/menu1-2-1"),
  //               name: "Menu1-2-1",
  //               meta: { title: "Menu1-2-1" },
  //             },
  //             {
  //               path: "menu1-2-2",
  //               component: () =>
  //                 import("@/views/nested/menu1/menu1-2/menu1-2-2"),
  //               name: "Menu1-2-2",
  //               meta: { title: "Menu1-2-2" },
  //             },
  //           ],
  //         },
  //         {
  //           path: "menu1-3",
  //           component: () => import("@/views/nested/menu1/menu1-3"),
  //           name: "Menu1-3",
  //           meta: { title: "Menu1-3" },
  //         },
  //       ],
  //     },
  //     {
  //       path: "menu2",
  //       component: () => import("@/views/nested/menu2/index"),
  //       name: "Menu2",
  //       meta: { title: "menu2" },
  //     },
  //   ],
  // },

  // {
  //   path: "external-link",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "https://panjiachen.github.io/vue-element-admin-site/#/",
  //       meta: { title: "External Link", icon: "link" },
  //     },
  //   ],
  // },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
