import React from "react";
import ReactDOM from "react-dom/client";
import App from "./view/App";
import "./main.less";
import { RecoilRoot } from "recoil";
import "@total-typescript/ts-reset";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RecoilRoot>
			<App />
		</RecoilRoot>
	</React.StrictMode>
);