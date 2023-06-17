import { Outlet } from "react-router-dom";
import { Layout } from "@arco-design/web-react";
import { connect } from "react-redux";
import LayoutSider from "./Sider/Sider";
import LayoutHeader from "./Header/Header";
import LayoutTabs from "./Tabs/Tabs";
import LockPage from "./Header/components/Lock/LockPage";

const Content = Layout.Content;

const LayoutIndex = (props: { lock: boolean }) => {
  const { lock } = props;

  return (
    <>
      {lock ? (
        <LockPage />
      ) : (
        <Layout className="layout-collapse-demo relative !flex-row">
          <LayoutSider />
          <Layout className="!flex-column">
            <LayoutHeader />
            <Layout>
              <LayoutTabs />
              <Layout className="!mt-[10px] !pl-[24px] !flex-col">
                <Content>
                  <Outlet />
                </Content>
                {/* <LayoutFooter /> */}
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      )}
    </>
  );
};

const mapStateToProps = (state: { Lock: { isLock: boolean } }) => ({
  lock: state.Lock.isLock
});
export default connect(mapStateToProps)(LayoutIndex);
