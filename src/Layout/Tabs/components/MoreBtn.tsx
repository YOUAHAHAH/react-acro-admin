import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Dropdown, Menu } from "@arco-design/web-react";
import {
  IconDown,
  IconRefresh,
  IconToLeft,
  IconToRight,
  IconClose,
} from "@arco-design/web-react/icon";
import l from "../../index.module.less";
import { list } from "@/Layout/type";

const MoreBtn = (props: any) => {
  const { tabsList, setTabsListState, handleDeleteTab } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const list: list[] = [
    {
      key: "1",
      label: "重新加载",
      icon: <IconRefresh style={{ marginRight: "5px" }} />,
      onClick: () => window.location.reload(),
    },
    {
      key: "2",
      label: "关闭当前标签页",
      icon: <IconClose style={{ marginRight: "5px" }} />,
      onClick: () => closeTheCurrentColumnLabel(),
      disabled: pathname === "/welcome/index" ? true : false,
      divider: true,
    },
    {
      key: "3",
      label: "关闭左侧标签页",
      icon: <IconToLeft style={{ marginRight: "5px" }} />,
      onClick: () => closeTheLeftColumnLabel(),
      disabled: tabsList.length <= 2 ? true : false,
    },
    {
      key: "4",
      label: "关闭右侧标签页",
      icon: <IconToRight style={{ marginRight: "5px" }} />,
      onClick: () => closeTheRightColumnLabel(),
      disabled: tabsList.length <= 2 ? true : false,
    },
    {
      key: "5",
      label: "关闭其他标签页",
      icon: <IconToRight style={{ marginRight: "5px" }} />,
      onClick: () => closeOtherColumnLabel(),
      disabled: tabsList.length <= 2 ? true : false,
    },
  ];

  const num = () => {
    let num = 0;
    tabsList.map((item: { path: string }, index: number) => {
      if (item.path === pathname) return (num = index);
    });
    return num;
  };

  // 关闭当前标签页
  const closeTheCurrentColumnLabel = () => {
    const closeTabsList = tabsList.filter(
      (item: { path: string }) => item.path === pathname,
    );
    handleDeleteTab(closeTabsList[0].path);
  };

  // 关闭左侧标签页
  const closeTheLeftColumnLabel = () => {
    const closeTabsList = tabsList.filter(
      (item: any) => !tabsList.slice(1, num()).includes(item),
    );
    setTabsListState(closeTabsList);
  };

  // 关闭右侧标签页
  const closeTheRightColumnLabel = () => {
    const closeTabsList = tabsList.filter(
      (item: any) => !tabsList.slice(num() + 1, tabsList.length).includes(item),
    );
    setTabsListState(closeTabsList);
  };

  // 关闭其他标签页
  const closeOtherColumnLabel = () => {
    const closeTabsList = tabsList.filter(
      (item: { path: string }) =>
        item.path === pathname || item.path === "/welcome/index",
    );
    navigate(closeTabsList.path);
    setTabsListState(closeTabsList);
  };

  return (
    <div className={l.dropdown}>
      <Dropdown
        droplist={
          <Menu>
            {list.map((item: list) => {
              return (
                <div key={item.key}>
                  <Menu.Item
                    key={item.key}
                    onClick={item.onClick}
                    disabled={item.disabled}>
                    {item.icon}
                    {item.label}
                  </Menu.Item>
                  <Divider
                    style={{
                      display: item.divider ? "block" : "none",
                      margin: "4px 0",
                    }}
                  />
                </div>
              );
            })}
          </Menu>
        }
        trigger='click'
        position='br'>
        <IconDown />
      </Dropdown>
    </div>
  );
};

export default MoreBtn;
