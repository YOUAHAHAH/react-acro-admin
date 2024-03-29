import { AnyAction } from "redux";
import produce from "immer";
import { AuthState } from "@/redux/Types/type";
import {
  ACRO_AUTH_TOKEN,
  LOSE_ACRO_AUTH_TOKEN
} from "@/redux/Types/mutation-types";
import Cookies from "js-cookie";

const authState: AuthState = {
  username: undefined,
  token: undefined,
  roles: []
};

const isAuth = (state: AuthState = authState, action: AnyAction) =>
  produce(state, (draftState: AuthState) => {
    switch (action.type) {
      case ACRO_AUTH_TOKEN:
        draftState = action.isAuth;
        Cookies.set(ACRO_AUTH_TOKEN, JSON.stringify(action.isAuth));
        break;
      case LOSE_ACRO_AUTH_TOKEN:
        draftState = authState;
        Cookies.remove(ACRO_AUTH_TOKEN);
        break;
      default:
        return draftState;
    }
  });

export default isAuth;
