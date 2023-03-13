import { LockState } from "@/redux/Types/type";
import {
  ACRO_LOCK_KEY_TRUE,
  ACRO_LOCK_KEY_FALSE,
} from "@/redux/Types/mutation-types";

// setLockState
export const setLockState = (isLock: LockState) => ({
  type: ACRO_LOCK_KEY_TRUE,
  isLock,
});

// loseLockState
export const loseLockState = () => ({
  type: ACRO_LOCK_KEY_FALSE,
});
