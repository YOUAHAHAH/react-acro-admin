import { ReactNode, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin, Message } from "@arco-design/web-react";
import { routerArray } from "@/router/index";
import { RouteObject } from "@/router/type";
import { getOpenKeys, deepLoopFloat, MenuItemType } from "@/utils/menuKey";
import { getRouterList } from "@/api/modules/routerList";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const SiderMenu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [menuList, setMenuList] = useState<MenuItemType[]>([]);

  const onClickMenuItem = useCallback(
    (key: string, _event: any, _keyPath: string[]) => {
      setSelectedKeys([key]);
      navigate(key);
    },
    []
  );

  const onClickSubMenu = (
    _key: string,
    openKeys: string[],
    keyPath: string[]
  ) => {
    if (openKeys.length === 0 || openKeys.length === 1)
      return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    return setOpenKeys(keyPath);
  };

  const getMenuList = async () => {
    try {
      const { data } = await getRouterList();
      if (!data) return;
      setMenuList(
        deepLoopFloat(
          routerArray.sort((a: RouteObject, b: RouteObject) => {
            return (a.meta?.rank as number) - (b.meta?.rank as number);
          })
        )
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

  const renderMenuItem = (menuList: MenuItemType[]) => {
    return menuList.map((item: MenuItemType) => {
      if (item.isChildren) {
        const subMenuTitle = (
          <span>
            {item.icons as ReactNode}
            {item.label}
          </span>
        );

        const children = item.children
          ? renderMenuItem(item.children as MenuItemType[])
          : null;

        return (
          <SubMenu key={item.key} title={subMenuTitle}>
            {children}
          </SubMenu>
        );
      } else {
        return (
          <MenuItem key={item.key}>
            {item.icons as ReactNode}
            {item.label}
          </MenuItem>
        );
      }
    });
  };

  return (
    <>
      <Spin loading={loading} tip="Loading..." className="h-full w-full">
        <Menu
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClickMenuItem={onClickMenuItem}
          onClickSubMenu={onClickSubMenu}
        >
          {renderMenuItem(menuList)}
        </Menu>
      </Spin>
    </>
  );
};

export default SiderMenu;
