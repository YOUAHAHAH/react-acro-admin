import { Navigate } from "react-router-dom";
import Login from "@/views/Login/index";
import Error404 from "@/views/Error/404";
import { RouteObject, MetaProps } from "./type";
import { permissionsMenu } from "./utils/permissions";

// * 后台标题
const pageTitle = import.meta.env.VITE_DEFAULT_TITLE;

// * 导入所有router
const metaRouters = import.meta.glob("./modules/*.tsx", { eager: true });

export let routerArray: RouteObject[] = [];

Object.keys(metaRouters).forEach(item => {
  Object.keys(metaRouters[item] as string).forEach((key: any) => {
    routerArray.push(...(metaRouters[item] as MetaProps)[key]);
  });
});

routerArray = permissionsMenu(routerArray);

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
    let routeTitle: string = "";

    const title = (route: {
      path: string;
      meta: {
        title: string;
        isChildren: boolean;
      };
      children: any[];
    }) => {
      if (route.path === "/" || route.path === "/login") {
        return (routeTitle = "登录");
      } else if (route.meta?.isChildren === false || route.path == "/*")
        return (routeTitle = route.meta.title);
      route.children?.map(item => {
        if (item.path === pathname) {
          return (routeTitle = item.meta.title);
        }
        title(item);
      });
      return pageTitle;
    };
    title(routes?.props.match.route);

    document.title =
      title === undefined ? pageTitle : `${routeTitle} | ${pageTitle}`;
  }, [routes]);

  return routes;
};

export default Router;
