import { useEffect } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import Login from "@/views/Login/index";
import Error404 from "@/views/Error/404";
import { RouteObject } from "./type";

// * 后台标题
const pageTitle = import.meta.env.VITE_DEFAULT_TITLE;

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
    element: <Navigate to="/login" />
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login"
    }
  },
  ...routerArray,
  {
    path: "/*",
    element: <Error404 />,
    meta: {
      requiresAuth: false,
      title: "404",
      key: "404"
    }
  }
];

const Router = () => {
  const routes = useRoutes(rootRouter as any);
  const { pathname } = useLocation();

  useEffect(() => {
    const title = routes?.props.match.route.children?.filter(
      (item: { path: string }) => item.path === pathname
    );

    document.title =
      title === undefined ? pageTitle : title[0].meta.title + " | " + pageTitle;
  }, [routes]);

  return routes;
};

export default Router;
