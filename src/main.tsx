import ReactDOM, { createRoot } from "react-dom/client";
import App from "@/App";
import "reset-css";
import "@arco-design/web-react/dist/css/arco.css";
import "./style/theme.less";
import { Provider } from "react-redux";
import store from "@/redux";

const container = document.getElementById("root") as HTMLElement;
const root: ReactDOM.Root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
