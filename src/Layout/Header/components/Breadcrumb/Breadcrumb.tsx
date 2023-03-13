import { useLocation } from "react-router-dom";
import { Breadcrumb } from "@arco-design/web-react";
import { routerArray } from "@/router/index";
import { currentMenu } from "@/utils/menuKey";

const BreadcrumbItem = Breadcrumb.Item;

const HeaderBreadCrumb = () => {
  const { pathname } = useLocation();
  const breadCrumbList = currentMenu(routerArray, pathname);

  console.log();
  return (
    <Breadcrumb>
      <BreadcrumbItem href={"/#/welcome/index"}>首页</BreadcrumbItem>
      {pathname === "/welcome/index"
        ? null
        : breadCrumbList.map(item => {
            return <BreadcrumbItem key={item.key}>{item.label}</BreadcrumbItem>;
          })}
    </Breadcrumb>
  );
};

export default HeaderBreadCrumb;
