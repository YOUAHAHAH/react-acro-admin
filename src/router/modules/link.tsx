import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { IconLink } from "@arco-design/web-react/icon";

const menuRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/link",
    meta: {
      title: "外部链接",
      rank: 99,
      isChildren: true,
      icon: <IconLink />
    },
    children: [
      {
        path: "/link/react",
        element: lazyLoad(lazy(() => import("@/Layout/FramePage"))),
        meta: {
          requiresAuth: true,
          title: "React文档(内嵌)",
          key: "react",
          frameSrc: "https://react.docschina.org/",
          isLink: true
        }
      },
      {
        path: "/link/acro",
        element: lazyLoad(lazy(() => import("@/Layout/FramePage"))),
        meta: {
          requiresAuth: true,
          title: "acro(外链)",
          frameSrc: "https://arco.design/react/docs/start",
          key: "acro",
          isOutsideLink: true
        }
      }
    ]
  }
];

export default menuRouter;
