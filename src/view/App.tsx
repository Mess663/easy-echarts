import css from "./app.module.less";
import ChartPreview from "./ChartPreview";
import OptionsForm from "./OptionsForm";
import { ErrorBoundary } from "react-error-boundary";
import GridTabs from "./GridTabs";

const App = () => {
	
	return (
		<div className={css.page}>
			<div className={css.left}>
				<OptionsForm />
			</div>

			<GridTabs />

			<div className={css.middle}>
				<ErrorBoundary fallback={<></>}>
					<ChartPreview />
				</ErrorBoundary>
			</div>
		</div>
	);
};

export default App;