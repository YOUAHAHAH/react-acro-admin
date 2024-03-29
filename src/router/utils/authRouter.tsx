import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { routePath } from "@/utils/menuKey";
import { setAuthState } from "@/redux/modules/Auth/action";
import { AuthState } from "@/redux/Types/type";
import { rootRouter } from "@/router/index";
import { ACRO_AUTH_TOKEN } from "@/redux/Types/mutation-types";

export const token = Cookies.get(ACRO_AUTH_TOKEN)
  ? JSON.parse(Cookies.get(ACRO_AUTH_TOKEN) as string).token
  : undefined;

export const authList = Cookies.get(ACRO_AUTH_TOKEN)
  ? JSON.parse(Cookies.get(ACRO_AUTH_TOKEN) as string).roles
  : undefined;

export const getTokenFromCookie = () => {
  const authCookie = Cookies.get(ACRO_AUTH_TOKEN);
  return authCookie ? JSON.parse(authCookie).token : undefined;
};

export const getAuthListFromCookie = () => {
  const authCookie = Cookies.get(ACRO_AUTH_TOKEN);
  return authCookie ? JSON.parse(authCookie).roles : undefined;
};

const authRouter = (props: { children: JSX.Element; auth: AuthState }) => {
  const { auth, children } = props;
  const { pathname } = useLocation();

  const getToken = getTokenFromCookie();
  const getAuthList = getAuthListFromCookie();

  const route = routePath(pathname, rootRouter); // 获取当前路由

  // axiosCanceler.removeAllPending(); // 在跳转路由之前，清除所有的请求

  if (!getToken) {
    // console.log(token);
  }

  // if (!route.meta?.requiresAuth) return children; // 判断当前路由是否需要访问权限(不需要权限直接放行)

  // if (!token) return <Navigate to="/login" replace />; // 判断是否登录

  // const whiteRouter = ["/welcome/index", "/404"]; // 白名单

  // if (whiteRouter.indexOf(pathname) == -1) return <Navigate to="/404" />;

  return children;
};

const mapStateToProps = (state: { Auth: AuthState }) => ({
  auth: state.Auth
});
const mapDispatchToProps = { setAuthState };
export default connect(mapStateToProps, mapDispatchToProps)(authRouter);
