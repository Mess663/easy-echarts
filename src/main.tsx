import React from "react";
import ReactDOM from "react-dom/client";
import App from "./view/App";
import "./main.less";
import "@total-typescript/ts-reset";
import { Provider } from "react-redux";
import { store } from "./models";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);