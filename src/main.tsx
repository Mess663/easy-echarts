import React from "react";
import ReactDOM from "react-dom/client";
import App from "./view/App";
import "./main.less";
import "@total-typescript/ts-reset";
import { Provider } from "react-redux";
import { store } from "./models";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";


import "./static/font/iconfont.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				locale={zhCN}
				theme={{
					token: {
						colorPrimary: "#3a5477",
					}
				}}
			>
				<App />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);