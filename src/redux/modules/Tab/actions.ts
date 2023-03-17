import { TabsState } from "@/redux/Types/type";
import { ACRO_TABS_LIST } from "@/redux/Types/mutation-types";

// setTabsListState
export const setTabsListState = (tabsList: TabsState) => ({
  type: ACRO_TABS_LIST,
  tabsList
});
