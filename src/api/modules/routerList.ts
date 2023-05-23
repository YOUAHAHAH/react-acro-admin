import { http } from "../index";

/**
 * @description 获取路由列表
 * @param _data
 */
export const getRouterList = (_data?: object) => {
  return http.get("/getAsyncRoutes");
};
