import { Menu, Spin, Message } from "@arco-design/web-react";
import * as Icon from "@arco-design/web-react/icon";
import { RouteObject } from "@/router/type";
import { getOpenKeys, deepLoopFloat, MenuItemType } from "@/utils/menuKey";
import { getRouterList } from "@/api/modules/routerList";
import { permissionsMenu } from "@/router/utils/permissions";

// const IconFont = Icon.addFromIconFontCn({
//   src: "//at.alicdn.com/t/c/font_4118603_w6e12ei5dq.js"
// });

const { SubMenu, Item: MenuItem } = Menu;

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
    [navigate]
  );

  const onClickSubMenu = useCallback(
    (_key: string, openKeys: string[], keyPath: string[]) => {
      if (openKeys.length === 0 || openKeys.length === 1)
        return setOpenKeys(openKeys);

      const latestOpenKey = openKeys[openKeys.length - 1];
      if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);

      return setOpenKeys(keyPath);
    },
    []
  );

  const getMenuList = async () => {
    try {
      const { data } = await getRouterList();

      if (!data) return;

      const sortedMenuList = deepLoopFloat(
        permissionsMenu(
          (data as RouteObject[]).sort(
            (a: RouteObject, b: RouteObject) =>
              (a.meta?.rank as number) - (b.meta?.rank as number)
          )
        )
      );

      setMenuList(sortedMenuList);

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

  const iconComponents = useMemo(() => {
    const components = {};
    Object.values(menuList).forEach(i => {
      components[i.icons as string] = eval(`Icon.${i.icons}`);
    });
    return components;
  }, [menuList]);

  const renderMenuItem = (menuList: MenuItemType[]) => {
    return menuList.map((item: MenuItemType) => {
      const IconComponent =
        iconComponents[item.icons as string] || Icon.IconCommon;

      if (item.isChildren) {
        const subMenuTitle = (
          <span>
            {item.icons ? <IconComponent /> : null}
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
            {item.icons ? <IconComponent /> : null}
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
