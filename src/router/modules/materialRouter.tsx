import React from "react";
import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconSafe } from "@arco-design/web-react/icon";

const materialRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/material",
    meta: {
      title: "物料管理",
      rank: 12,
      isChildren: true,
      icon: <IconSafe />
    },
    children: [
      {
        path: "/material/materialList",
        element: lazyLoad(
          React.lazy(() => import("@/views/Material/materialList"))
        ),
        meta: {
          requiresAuth: true,
          title: "物料查询",
          key: "btn"
        }
      },
      {
        path: "/material/materialGroup",
        element: lazyLoad(
          React.lazy(() => import("@/views/Material/materialGroup"))
        ),
        meta: {
          requiresAuth: true,
          title: "团队查询",
          key: "page"
        }
      }
    ]
  }
];

export default materialRouter;
