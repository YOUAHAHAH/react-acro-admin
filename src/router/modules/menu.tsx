import React from "react";
import { LayoutIndex, lazyLoad } from "../baseRouter";
import { RouteObject } from "@/router/type";
import { IconUnorderedList } from "@arco-design/web-react/icon";

const menuRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/menu",
    meta: {
      title: "嵌套菜单",
      rank: 12,
      isChildren: true,
      icon: <IconUnorderedList />,
    },
    children: [
      {
        path: "/menu/menu1",
        element: lazyLoad(React.lazy(() => import("@/views/menu/menu1/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单1",
          key: "menu1",
        },
      },
      {
        path: "/menu/menu2",
        meta: {
          requiresAuth: true,
          title: "菜单2",
          key: "menu2",
          isChildren: true,
          icon: <IconUnorderedList />,
        },
        children: [
          {
            path: "/menu/menu2/menu21",
            element: lazyLoad(
              React.lazy(() => import("@/views/menu/menu2/menu21/index")),
            ),
            meta: {
              requiresAuth: true,
              title: "菜单2-1",
              key: "menu21",
            },
          },
          {
            path: "/menu/menu2/menu22",
            element: lazyLoad(
              React.lazy(() => import("@/views/menu/menu2/menu22/index")),
            ),
            meta: {
              requiresAuth: true,
              title: "菜单2-2",
              key: "menu22",
            },
          },
          {
            path: "/menu/menu2/menu23",
            element: lazyLoad(
              React.lazy(() => import("@/views/menu/menu2/menu23/index")),
            ),
            meta: {
              requiresAuth: true,
              title: "菜单2-3",
              key: "menu23",
            },
          },
        ],
      },
      {
        path: "/menu/menu3",
        element: lazyLoad(React.lazy(() => import("@/views/menu/menu3/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单3",
          key: "menu3",
        },
      },
    ],
  },
];

export default menuRouter;
