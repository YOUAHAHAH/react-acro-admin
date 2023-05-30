import React from "react";
import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconApps } from "@arco-design/web-react/icon";

const ableRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/components",
    meta: {
      title: "组件",
      rank: 12,
      isChildren: true,
      icon: <IconApps />
    },
    children: [
      {
        path: "/components/searchBox",
        element: lazyLoad(
          React.lazy(() => import("@/views/Components/searchBox"))
        ),
        meta: {
          requiresAuth: true,
          title: "搜索组件",
          key: "searchBox"
        }
      },
      {
        path: "/components/message",
        element: lazyLoad(
          React.lazy(() => import("@/views/Components/message"))
        ),
        meta: {
          requiresAuth: true,
          title: "消息提示",
          key: "message"
        }
      },
      {
        path: "/components/download",
        element: lazyLoad(
          React.lazy(() => import("@/views/Components/download"))
        ),
        meta: {
          requiresAuth: true,
          title: "下载组件",
          key: "download"
        }
      }
    ]
  }
];

export default ableRouter;
