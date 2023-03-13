import { AnyAction } from "redux";
import produce from "immer";
import { TabsState } from "@/redux/Types/type";
import { ACRO_TABS_LIST } from "@/redux/Types/mutation-types";

const tabsState: TabsState = {
  tabsActive: "/welcome/index",
  tabsList: [{ title: "首页", path: "/welcome/index" }],
};

const isLock = (state: TabsState = tabsState, action: AnyAction) =>
  produce(state, (draftState: TabsState) => {
    switch (action.type) {
      case ACRO_TABS_LIST:
        draftState.tabsList = action.tabsList;
        break;
      default:
        return draftState;
    }
  });

export default isLock;
