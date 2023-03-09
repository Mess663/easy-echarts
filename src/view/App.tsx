import React from "react";
import css from "./app.module.less";
import ChartPreview from "./ChartPreview";
import OptionsForm from "./OptionsForm";

const App = () => {
	return (
		<div className={css.page}>
			<div className={css.left}>
				<OptionsForm />
			</div>
			<div className={css.middle}>
				<ChartPreview />
			</div>
		</div>
	);
};

export default App;