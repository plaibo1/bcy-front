import { App as AntdApp, ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store";
import { Outlet } from "react-router";

import ru_RU from "antd/lib/locale/ru_RU";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

// // костыль для basic auth
// fetch("/api/v1/", {
//   method: "POST",
//   // credentials: "include",
// }).then(() => {
//   console.log("BASE_URL", import.meta.env.VITE_BASE_URL);
// });

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        locale={ru_RU}
        theme={{
          token: {
            colorPrimary: "#3f52ff",
            colorInfo: "#3f52ff",
            fontSize: 16,
            borderRadius: 12,
            colorSuccess: "#59cf1d",
          },
        }}
      >
        <AntdApp>
          <Outlet />
        </AntdApp>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
