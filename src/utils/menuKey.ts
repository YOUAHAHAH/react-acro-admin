import { ReactNode } from "react";
import { MenuProps } from "@arco-design/web-react/es/Menu/interface";
import { RouteObject } from "@/router/type";

/**
 *
 * @description 获取需要展开的 subMenu
 * @param {string} path 刷新时的路径
 * @returns {string[]} newArr
 */

export const getOpenKeys = (path: string): string[] => {
  let newStr = "";
  const newArr: string[] = [];
  const arr: string[] = path.split("/").map((i: string) => "/" + i);
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i];
    newArr.push(newStr);
  }
  return newArr;
};

export type MenuItemType = Required<MenuProps>[][number] & {
  key: string;
  label: string;
  isChildren?: boolean;
  isLink?: boolean;
};

/**
 *
 * @param label
 * @param key
 * @param children
 * @param icon
 * @param type
 * @returns
 */

const getItem = (
  label: React.ReactNode,
  key: React.Key | null | string | undefined,
  isChildren?: boolean,
  icons?: ReactNode,
  children?: MenuItemType[],
  type?: "group"
): MenuItemType => {
  return {
    key,
    children,
    isChildren,
    label,
    icons,
    type
  } as unknown as MenuItemType;
};

/**
 *
 * @description 获取菜单列表
 * @param {Menu.MenuOptions} menuList 路由列表
 * @returns newArr
 */

export const deepLoopFloat = (menuList: Menu.MenuOptions[]) => {
  const newArr: MenuItemType[] = [];
  menuList.forEach((item: RouteObject) => {
    if (!item.children?.length) {
      return newArr.push(
        getItem(
          item.meta?.title,
          item.path,
          item.meta?.isChildren,
          item.meta?.icon
        )
      );
    } else {
      newArr.push(
        getItem(
          item.meta?.title,
          item.path,
          item.meta?.isChildren,
          item.meta?.icon,
          deepLoopFloat(item.children)
        )
      );
    }
  });
  return newArr;
};

/**
 *
 * @description 获取面包屑列表
 * @param {Menu.MenuOptions[]} menuList
 * @param {string} path
 * @returns arr
 */

export const currentMenu = (menuList: Menu.MenuOptions[], path: string) => {
  const newArr: MenuItemType[] = [];
  const title: { key?: string; label?: string }[] = [];
  const openMenu = menuList.filter(
    (item: RouteObject) => item.path === getOpenKeys(path)[0]
  );

  const deepMap = (deepItem: Menu.MenuOptions[]) => {
    deepItem.map((item: Menu.MenuOptions) => {
      if (!item.children?.length)
        return newArr.push(getItem(item.meta?.title, item.path));
      deepMap(item.children);
    });
  };
  deepMap(openMenu);

  title.push(getItem(openMenu[0]?.meta?.title, openMenu[0]?.path));
  title.push(...newArr.filter((item: any) => item.key === path));

  return title;
};

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
