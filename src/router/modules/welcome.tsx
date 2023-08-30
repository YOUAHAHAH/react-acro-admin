import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconHome } from "@arco-design/web-react/icon";

const welcomeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/welcome/index",
    meta: {
      title: "首页",
      rank: 1,
      isChildren: false,
      auth: ["user", "admin"]
    },
    children: [
      {
        path: "/welcome/index",
        element: lazyLoad(lazy(() => import("@/views/Welcome"))),
        meta: {
          requiresAuth: true,
          title: "首页",
          key: "welcome"
        }
      }
    ]
  }
];

export default welcomeRouter;
