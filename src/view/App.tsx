import css from "./app.module.less";
import ChartPreview from "./ChartPreview";
import OptionsForm from "./OptionsForm";
import { ErrorBoundary } from "react-error-boundary";
import GridTabs from "./GridTabs";
import OperateBar from "./ OperateBar";
import { useSelector } from "react-redux";
import { RootState } from "../models";

const App = () => {
	const gridMode = useSelector((state: RootState) => state.ui.gridMode);

	const middlePart = (
		<div className={css.middle}>
			<OperateBar />

			<div className={css.chartPreview}>
				<ErrorBoundary fallback={<></>}>
					<ChartPreview />
				</ErrorBoundary>
			</div>
		</div>
	);

	if (gridMode) {
		return (
			<div className={css.page}>
				{middlePart}
			</div>
		);
	}
	
	return (
		<div className={css.page}>
			<div className={css.left}>
				<ErrorBoundary fallback={<></>}>
					<OptionsForm />
				</ErrorBoundary>
			</div>

			<GridTabs />

			{middlePart}
		</div>
	);
};

export default App;