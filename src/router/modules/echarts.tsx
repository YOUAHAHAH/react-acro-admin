import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
import { RouteObject } from "@/router/type";
import { Icon } from "@arco-design/web-react";

const IconFont = Icon.addFromIconFontCn({
  src: "//at.alicdn.com/t/c/font_4118603_w6e12ei5dq.js"
});

const echartsRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    path: "/echarts",
    meta: {
      title: "测试图表",
      rank: 2,
      isChildren: true,
      icon: <IconFont type="icon-hot" />
    },
    children: [
      {
        path: "/echarts/test",
        element: lazyLoad(lazy(() => import("@/views/Echarts/test"))),
        meta: {
          requiresAuth: true,
          title: "测试图表",
          key: "echarts",
          keepAlive: true
        }
      }
    ]
  }
];

export default echartsRouter;
