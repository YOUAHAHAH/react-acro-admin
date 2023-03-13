import { RouteObject } from "@/router/type";

/**
 *
 * @param {string} path 当前路径
 * @param {RouteObject[]} routes 路由列表
 * @returns result
 */

export const routePath = (path: string, routes: RouteObject[] = []) => {
  let result: RouteObject = {};
  routes.map((item: RouteObject) => {
    if (item.path === path) return (result = item);
    if (item.children) {
      const res = routePath(path, item.children);
      if (Object.keys(res).length) result = res;
    }
  });
  return result;
};
