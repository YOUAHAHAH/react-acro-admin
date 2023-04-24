import React from "react";
import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconSettings } from "@arco-design/web-react/icon";

const activityCenterRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/activityCenter",
    meta: {
      title: "活动管理",
      rank: 13,
      isChildren: false
    },
    children: [
      {
        path: "/activityCenter/index",
        element: lazyLoad(React.lazy(() => import("@/views/ActivityCenter"))),
        meta: {
          requiresAuth: true,
          title: "活动管理",
          key: "activityCenter",
          icon: <IconSettings />
        }
      }
    ]
  }
];

export default activityCenterRouter;
