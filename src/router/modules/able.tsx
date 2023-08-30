import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconCommon } from "@arco-design/web-react/icon";

const ableRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/able",
    meta: {
      title: "功能",
      rank: 11,
      isChildren: true,
      auth: ["admin"]
    },
    children: [
      {
        path: "/able/qrcode",
        element: lazyLoad(lazy(() => import("@/views/Able/qrcode"))),
        meta: {
          requiresAuth: true,
          title: "二维码",
          key: "qrcode"
        }
      },
      {
        path: "/able/scraping",
        element: lazyLoad(lazy(() => import("@/views/Able/scraping"))),
        meta: {
          requiresAuth: true,
          title: "刮刮乐",
          key: "scraping"
        }
      }
    ]
  }
];

export default ableRouter;
