import { Layout } from "@arco-design/web-react";
import HeaderLogo from "./components/Logo";
import HaerderFullscreen from "./components/Fullscreen";
import HaerderTheme from "./components/Theme";
import HaerderSetting from "./components/Setting";
import HeaderNetworkInfo from "./components/NetworkInfo";
import HaerderAvatar from "./components/Avatar";
import HeaderBreadCrumb from "./components/Breadcrumb/Breadcrumb";
import l from "../index.module.less";

const Header = Layout.Header;

const LayoutHeader = () => {
  return (
    <Header className={l.header}>
      <div className={l.headerBreadcrumb}>
        <HeaderLogo />
        <HeaderBreadCrumb />
      </div>
      <div className={l.headerBox}>
        <HeaderNetworkInfo />
        <HaerderFullscreen />
        <HaerderTheme />
        <HaerderSetting />
        <HaerderAvatar />
      </div>
    </Header>
  );
};

export default LayoutHeader;
