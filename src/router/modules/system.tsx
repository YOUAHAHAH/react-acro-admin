// import React from "react";
// import { LayoutIndex, lazyLoad } from "../utils/baseRouter";
// import { RouteObject } from "@/router/type";
// import { IconSettings } from "@arco-design/web-react/icon";

// const systemRouter: Array<RouteObject> = [
//   {
//     element: <LayoutIndex />,
//     path: "/system",
//     meta: {
//       title: "系统管理",
//       rank: 13,
//       isChildren: true,
//       icon: <IconSettings />
//     },
//     children: [
//       {
//         path: "/system/personnel",
//         element: lazyLoad(React.lazy(() => import("@/views/System/Personnel"))),
//         meta: {
//           requiresAuth: true,
//           title: "人员管理",
//           key: "personnel"
//         }
//       },
//       {
//         path: "/system/department",
//         element: lazyLoad(
//           React.lazy(() => import("@/views/System/Department"))
//         ),
//         meta: {
//           requiresAuth: true,
//           title: "部门管理",
//           key: "department"
//         }
//       }
//     ]
//   }
// ];

// export default systemRouter;
