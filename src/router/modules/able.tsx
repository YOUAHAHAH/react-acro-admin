// import React from "react";
// import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
// import { RouteObject } from "@/router/type";
// import { IconApps } from "@arco-design/web-react/icon";

// const ableRouter: Array<RouteObject> = [
//   {
//     element: <LayoutIndex />,
//     path: "/able",
//     meta: {
//       title: "功能",
//       rank: 14,
//       isChildren: true,
//       icon: <IconApps />
//     },
//     children: [
//       {
//         path: "/able/qrcode",
//         element: lazyLoad(React.lazy(() => import("@/views/Able/qrcode"))),
//         meta: {
//           requiresAuth: true,
//           title: "二维码",
//           key: "qrcode"
//         }
//       },
//     ]
//   }
// ];

// export default ableRouter;
