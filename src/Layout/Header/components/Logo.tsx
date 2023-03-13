import { Image } from "@arco-design/web-react";
import logo from "@/assets/img/logo.png";
import l from "../../index.module.less";

const HeaderLogo = () => {
  return (
    <div className={l.headerlogo}>
      <Image width={30} src={logo} alt='lamp' preview={false} />
      <span>ACRO_MSY</span>
    </div>
  );
};

export default HeaderLogo;
