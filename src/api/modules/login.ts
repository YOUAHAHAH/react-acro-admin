import { http } from "../index";

/**
 * @description 登录
 * @param data username password
 */
export const getLogin = (data?: object) => {
  return http.post("/login", { ...data });
};
