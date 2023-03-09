import { HashRouter } from "react-router-dom";
import Router from "@/router/index";

export default function App() {
  return (
    // <ConfigProvider
    //   locale={getLocale()}
    //   tablePagination={{
    //     hideOnSinglePage,
    //   }}>
    <HashRouter>
      <Router />
    </HashRouter>
    // </ConfigProvider>
  );
}
