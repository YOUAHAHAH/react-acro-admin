import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin, Message } from "@arco-design/web-react";
import { routerArray } from "@/router/index";
import { RouteObject } from "@/router/type";
import { getOpenKeys, deepLoopFloat, MenuItemType } from "@/utils/menuKey";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const SiderMenu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [menuList, setMenuList] = useState<MenuItemType[]>([]);

  const onClickMenuItem = (key: string, _event: any, _keyPath: string[]) => {
    setSelectedKeys([key]);
    navigate(key);
  };

  const onClickSubMenu = (
    _key: string,
    openKeys: string[],
    keyPath: string[],
  ) => {
    if (openKeys.length === 0 || openKeys.length === 1)
      return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    return setOpenKeys(keyPath);
  };

  const getMenuList = async () => {
    try {
      setMenuList(
        deepLoopFloat(
          routerArray.sort((a: RouteObject, b: RouteObject) => {
            return (a?.meta?.rank as number) - (b?.meta?.rank as number);
          }),
        ),
      );
      setTimeout(() => {
        setLoading(!loading);
      }, 1000);
    } catch {
      Message.error("菜单加载异常");
      setLoading(!loading);
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(getOpenKeys(pathname));
  }, [pathname]);

  return (
    <>
      <Spin
        loading={loading}
        tip='Loading...'
        style={{ height: "100%", width: "100%" }}>
        <Menu
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClickMenuItem={onClickMenuItem}
          onClickSubMenu={onClickSubMenu}>
          {menuList.map((item: any) => {
            return !item.isChildren ? (
              item.children.map((i: MenuItemType) => {
                return (
                  <MenuItem key={i.key}>
                    {i.icons as unknown as any}
                    {i.label}
                  </MenuItem>
                );
              })
            ) : (
              <SubMenu
                key={item.key}
                title={
                  <span>
                    {item.icons}
                    {item.label}
                  </span>
                }>
                {item.children?.map((i: any) => {
                  return i.children ? (
                    <SubMenu key={i.key} title={<span>{i.label}</span>}>
                      {i.children?.map((a: MenuItemType) => {
                        return <MenuItem key={a.key}>{a.label}</MenuItem>;
                      })}
                    </SubMenu>
                  ) : (
                    <MenuItem key={i.key}>{i.label}</MenuItem>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </Spin>
    </>
  );
};

export default SiderMenu;
