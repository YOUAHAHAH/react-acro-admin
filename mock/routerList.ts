import { MockMethod } from "vite-plugin-mock";

const systemRouter = {
  path: "/system",
  meta: {
    title: "系统管理",
    icon: "IconSettings",
    rank: 13,
    isChildren: true
  },
  children: [
    {
      path: "/system/personnel",
      element: "@/views/Permission/Page",
      meta: {
        requiresAuth: true,
        key: "personnel",
        title: "人员管理",
        roles: ["admin"]
      }
    },
    {
      path: "/system/department",
      element: "@/views/Permission/Btn",
      meta: {
        requiresAuth: true,
        key: "department",
        title: "部门管理",
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
        data: [systemRouter]
      };
    }
  }
] as MockMethod[];
