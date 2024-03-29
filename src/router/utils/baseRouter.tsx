import { LazyExoticComponent, Suspense, ReactNode } from "react";
import { Spin } from "@arco-design/web-react";
import Layout from "@/Layout/index";

/**
 * @description 路由懒加载
 * @param {Element} Comp 需要访问的组件
 * @returns element
 */

export const lazyLoad = (Comp: LazyExoticComponent<any>): ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          dot
          size={40}
          className="!flex items-center justify-center h-full"
        />
      }
    >
      <Comp />
    </Suspense>
  );
};

// 懒加载 Layout
// import React from "react";
// import lazyLoad from "@/utils/lazyRouter";
// const Layout = lazyLoad(React.lazy(() => import("@/layouts/index")));
/**
 * @description: default layout
 */

export const LayoutIndex = () => <Layout />;
