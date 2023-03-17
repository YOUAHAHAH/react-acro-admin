import {
  legacy_createStore as createStore,
  combineReducers,
  compose
} from "redux";
import { applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import Lock from "./modules/Lock/reducer";
import Tab from "./modules/Tab/reducer";

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 汇总reducer
const allReducer = combineReducers({ Lock, Tab });

export default createStore(allReducer, composeEnhancers(middleWares));
