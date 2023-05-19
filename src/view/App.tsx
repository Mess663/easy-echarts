import React, { Suspense } from "react";
import css from "./app.module.less";
import OptionsForm from "./OptionsForm";
import { ErrorBoundary } from "react-error-boundary";
import GridTabs from "./GridTabs";
import OperateBar from "./ OperateBar";
import { useSelector } from "react-redux";
import { RootState } from "../models";
import CodeSpace from "./CodeSpace";

const ChartPreview = React.lazy(() => import("./ChartPreview"));

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

			<Suspense fallback={
				<div className={css.chartPreview} />
			}
			>
				{middlePart}
			</Suspense>

			<CodeSpace />
		</div>
	);
};

export default App;