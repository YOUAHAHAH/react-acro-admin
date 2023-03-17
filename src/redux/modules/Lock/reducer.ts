import { AnyAction } from "redux";
import produce from "immer";
import { LockState } from "@/redux/Types/type";
import {
  ACRO_LOCK_KEY,
  ACRO_LOCK_KEY_TRUE,
  ACRO_LOCK_KEY_FALSE
} from "@/redux/Types/mutation-types";
import { setSessionStore, getSessionStore } from "@/utils/storage";

const lockState: LockState =
  getSessionStore(ACRO_LOCK_KEY) === null
    ? {
        isLock: false,
        pwd: ""
      }
    : getSessionStore(ACRO_LOCK_KEY);

const isLock = (state: LockState = lockState, action: AnyAction) =>
  produce(state, (draftState: LockState) => {
    switch (action.type) {
      case ACRO_LOCK_KEY_TRUE:
        draftState.isLock = true;
        draftState.pwd = action.isLock.pwd;
        setSessionStore(ACRO_LOCK_KEY, {
          isLock: true,
          pwd: action.isLock.pwd
        });
        break;
      case ACRO_LOCK_KEY_FALSE:
        draftState.isLock = false;
        setSessionStore(ACRO_LOCK_KEY, {
          isLock: false,
          pwd: ""
        });
        break;
      default:
        return draftState;
    }
  });

export default isLock;
