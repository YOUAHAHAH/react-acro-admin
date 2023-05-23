import { MockMethod } from "vite-plugin-mock";

const asyncRouter = {
  path: "/auth",
  meta: {
    title: "权限管理",
    icon: "<IconIdcard />",
    rank: 17,
    isChildren: true
  },
  children: [
    {
      path: "/auth/page",
      element: "@/views/auth/page",
      meta: {
        requiresAuth: true,
        key: "page",
        title: "页面权限",
        roles: ["admin"]
      }
    },
    {
      path: "/auth/btn",
      element: "@/views/auth/btn",
      meta: {
        requiresAuth: true,
        key: "btn",
        title: "按钮权限",
        roles: ["admin"]
      }
    }
  ]
};

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        success: true,
        msg: "获取成功",
        data: [asyncRouter]
      };
    }
  }
] as MockMethod[];
