import { useState } from "react";
import { Layout } from "@arco-design/web-react";
import { IconCaretLeft, IconCaretRight } from "@arco-design/web-react/icon";
import SiderMenu from "./components/Menu";
import SideLogo from "./components/Logo";

const Sider = Layout.Sider;

const LayoutSider = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <>
      <Sider
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
        collapsible
        trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
        breakpoint="xl"
      >
        <SideLogo />
        <SiderMenu />
      </Sider>
    </>
  );
};

export default LayoutSider;
