import ReactDOM, { createRoot } from "react-dom/client";
import App from "@/App";

// 引入重置样式
import "./style/reset.less";
import "./style/theme.less";
import "./style/tailwind.css";
import "@arco-design/web-react/dist/css/arco.css";

import { Provider } from "react-redux";
import store from "@/redux";

const container = document.getElementById("root") as HTMLElement;
const root: ReactDOM.Root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
