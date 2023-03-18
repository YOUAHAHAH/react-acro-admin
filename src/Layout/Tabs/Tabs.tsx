import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setTabsListState } from "@/redux/modules/Tab/actions";
import { Tabs } from "@arco-design/web-react";
import { TabsState } from "@/redux/Types/type";
import { routerArray } from "@/router/index";
import { routePath } from "@/utils/menuKey";
import MoreBtn from "./components/MoreBtn";
import l from "../index.module.less";

const TabPane = Tabs.TabPane;

const LayoutTabs = (props: any) => {
  const { tabsList, setTabsListState } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(pathname);

  // addTab
  const handleAddTab = () => {
    const route = routePath(pathname, routerArray);
    let newArr = [...tabsList.tabsList];
    if (tabsList.tabsList.every((item: any) => item.path !== route.path)) {
      newArr.push({ title: route.meta!.title, path: route.path });
    }
    setTabsListState(newArr);
    setActiveTab(pathname);
  };

  // deleteTab
  const handleDeleteTab = (key: string) => {
    if (key === "/welcome/index") return;
    if (pathname === key) {
      tabsList.tabsList.forEach((item: Menu.MenuOptions, index: number) => {
        if (item.path !== pathname) return;
        const nextTab =
          tabsList.tabsList[index + 1] || tabsList.tabsList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.path);
      });
    }
    setTabsListState(
      tabsList.tabsList.filter((item: Menu.MenuOptions) => item.path !== key)
    );
  };

  // clickTab
  const onChange = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    handleAddTab();
  }, [pathname]);

  return (
    <>
      <div className={l.tabs}>
        <Tabs
          editable
          showAddButton={false}
          overflow="scroll"
          type="card-gutter"
          direction="horizontal"
          scrollPosition="auto"
          activeTab={activeTab}
          onAddTab={handleAddTab}
          onDeleteTab={handleDeleteTab}
          onChange={onChange}
        >
          {tabsList.tabsList.map((item: Menu.MenuOptions) => {
            return (
              <TabPane
                style={{ width: "100%" }}
                destroyOnHide
                closable={item.path !== "/welcome/index"}
                key={item.path}
                title={item.title}
              ></TabPane>
            );
          })}
        </Tabs>
        <MoreBtn
          tabsList={tabsList.tabsList}
          setTabsListState={setTabsListState}
          handleDeleteTab={handleDeleteTab}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state: { Tab: TabsState }) => ({
  tabsList: state.Tab
});
const mapDispatchToProps = { setTabsListState };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
