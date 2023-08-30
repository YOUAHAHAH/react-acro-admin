import { AuthState } from "@/redux/Types/type";
import {
  ACRO_AUTH_TOKEN,
  LOSE_ACRO_AUTH_TOKEN
} from "@/redux/Types/mutation-types";

// setLockState
export const setAuthState = (isAuth: AuthState) => ({
  type: ACRO_AUTH_TOKEN,
  isAuth
});

// loseLockState
export const loseAuthState = () => ({
  type: LOSE_ACRO_AUTH_TOKEN
});
