import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/views/Login/index";
import { RouteObject } from "./type";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item] as unknown as any).forEach((key: any) => {
    routerArray.push(...(metaRouters[item] as unknown as any)[key]);
  });
});

export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to='/login' />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login",
    },
  },
  ...routerArray,
  {
    path: "*",
    element: <Navigate to='/404' />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter as any);
  return routes;
};

export default Router;
