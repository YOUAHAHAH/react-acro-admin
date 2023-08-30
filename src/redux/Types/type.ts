/* LockState */
export interface LockState {
  isLock: boolean;
  pwd: string;
}

// TabsState
export interface TabsState {
  tabsActive: string;
  tabsList: Menu.MenuOptions[];
}

// AuthState
export interface AuthState {
  username: string | undefined;
  roles: string[];
  token: string | undefined;
}
