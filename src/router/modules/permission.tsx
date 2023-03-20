import React from "react";
import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconSafe } from "@arco-design/web-react/icon";

const permissionRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/permission",
    meta: {
      title: "权限管理",
      rank: 12,
      isChildren: true,
      icon: <IconSafe />
    },
    children: [
      {
        path: "/permission/Page",
        element: lazyLoad(React.lazy(() => import("@/views/Permission/Page"))),
        meta: {
          requiresAuth: true,
          title: "页面权限",
          key: "page"
        }
      },
      {
        path: "/permission/Btn",
        element: lazyLoad(React.lazy(() => import("@/views/Permission/Btn"))),
        meta: {
          requiresAuth: true,
          title: "按钮权限",
          key: "btn"
        }
      }
    ]
  }
];

export default permissionRouter;
