import React from "react";
import css from "./app.module.less";
import OptionsForm from "./OptionsForm";

const App = () => {
	return (
		<div className={css.page}>
			<div className={css.left}>
				<OptionsForm />
			</div>
		</div>
	);
};

export default App;