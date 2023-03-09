import React from "react";
import { LayoutIndex, lazyLoad } from "../baseRouter";
import { RouteObject } from "@/router/type";
import { IconHome } from "@arco-design/web-react/icon";

const welcomeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/welcome",
    meta: {
      title: "首页",
      rank: 10,
      isChildren: false,
    },
    children: [
      {
        path: "/welcome/index",
        element: lazyLoad(React.lazy(() => import("@/views/Welcome"))),
        meta: {
          requiresAuth: true,
          title: "首页",
          key: "welcome",
          icon: <IconHome />,
        },
      },
    ],
  },
];

export default welcomeRouter;
