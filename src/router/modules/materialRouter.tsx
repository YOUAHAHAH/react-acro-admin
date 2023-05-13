import React from "react";
import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconSafe } from "@arco-design/web-react/icon";

const materialRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/material",
    meta: {
      title: "权限管理",
      rank: 12,
      isChildren: true,
      icon: <IconSafe />
    },
    children: [
      {
        path: "/material/Page",
        element: lazyLoad(React.lazy(() => import("@/views/Material/Page"))),
        meta: {
          requiresAuth: true,
          title: "页面权限",
          key: "page"
        }
      },
      {
        path: "/material/Btn",
        element: lazyLoad(React.lazy(() => import("@/views/Material/Btn"))),
        meta: {
          requiresAuth: true,
          title: "按钮权限",
          key: "btn"
        }
      }
    ]
  }
];

export default materialRouter;
