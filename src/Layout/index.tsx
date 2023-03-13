import { Outlet } from "react-router-dom";
import { Layout } from "@arco-design/web-react";
import { connect } from "react-redux";
import LayoutSider from "./Sider/Sider";
import LayoutHeader from "./Header/Header";
import LayoutFooter from "./Footer/Footer";
import LayoutTabs from "./Tabs/Tabs";
import LockPage from "./Header/components/Lock/LockPage";

const Content = Layout.Content;

const LayoutIndex = (props: any) => {
  const { lock } = props;

  return (
    <>
      {lock ? (
        <LockPage />
      ) : (
        <Layout className={"layout-collapse-demo"}>
          <LayoutHeader />
          <Layout style={{ flexDirection: "row", overflow: "hidden" }}>
            <LayoutSider />
            <Layout>
              <LayoutTabs />
              <Layout
                style={{
                  marginTop: "10px",
                  padding: "0 24px",
                  flexDirection: "column",
                }}>
                <Content id='main'>
                  <Outlet />
                </Content>
                <LayoutFooter />
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  lock: state.Lock.isLock,
});
export default connect(mapStateToProps)(LayoutIndex);
