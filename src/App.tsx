import { HashRouter } from "react-router-dom";
import AuthRouter from "@/router/utils/authRouter";
import Router from "@/router/index";

export default function App() {
  return (
    // <ConfigProvider
    //   locale={getLocale()}
    //   tablePagination={{
    //     hideOnSinglePage,
    //   }}>
    <HashRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </HashRouter>
    // </ConfigProvider>
  );
}
