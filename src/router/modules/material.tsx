import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconExperiment } from "@arco-design/web-react/icon";

const materialRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/material",
    meta: {
      title: "物料管理",
      rank: 15,
      isChildren: true,
      auth: ["admin"]
    },
    children: [
      {
        path: "/material/materialGroup",
        element: lazyLoad(lazy(() => import("@/views/Material/materialGroup"))),
        meta: {
          requiresAuth: true,
          title: "团队查询",
          key: "materialGroup",
          keepAlive: true
        }
      }
    ]
  }
];

export default materialRouter;
