import { ACRO_AUTH_TOKEN } from "@/redux/Types/mutation-types";
import { RouteObject } from "../type";
import Cookies from "js-cookie";

const getAuthListFromCookie = () => {
  const authCookie = Cookies.get(ACRO_AUTH_TOKEN);
  return authCookie ? JSON.parse(authCookie).roles : undefined;
};

const getAuthList = getAuthListFromCookie();

export const permissionsMenu = (menuList: RouteObject[]) => {
  if (!getAuthList) return menuList;
  return menuList.filter(item => item.meta?.auth?.includes(getAuthList.join()));
};
