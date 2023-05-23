import { AnyAction } from "redux";
import produce from "immer";
import { AuthState } from "@/redux/Types/type";
import { ACRO_AUTH_TOKEN } from "@/redux/Types/mutation-types";
import Cookies from "js-cookie";

const authState: AuthState = {
  username: "",
  token: "",
  roles: []
};

const isAuth = (state: AuthState = authState, action: AnyAction) =>
  produce(state, (draftState: AuthState) => {
    switch (action.type) {
      case ACRO_AUTH_TOKEN:
        draftState = action.isAuth;
        Cookies.set(ACRO_AUTH_TOKEN, JSON.stringify(action.isAuth));
        break;
      default:
        return draftState;
    }
  });

export default isAuth;
