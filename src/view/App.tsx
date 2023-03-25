import React from "react";
import css from "./app.module.less";
import ChartPreview from "./ChartPreview";
import OptionsForm from "./OptionsForm";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
	return (
		<div className={css.page}>
			<div className={css.left}>
				<OptionsForm />
			</div>
			<div className={css.middle}>
				<ErrorBoundary fallback={<></>}>
					<ChartPreview />
				</ErrorBoundary>
			</div>
		</div>
	);
};

export default App;