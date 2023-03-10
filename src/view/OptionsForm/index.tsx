import React from "react";
import Drawer from "../../components/Drawer";
import ChartSelector from "../../option_components/ChartSelector";
import css from "./index.module.less";
import TitleForm from "../../option_components/TitleForm";
import { Dispatch, RootState } from "../../models";
import { useSelector, useDispatch } from "react-redux";

/**
 * 配置项管理表单
 */
function OptionsForm() {
	const charts = useSelector((state: RootState) => state.optionForm.charts); 
	const dispatch = useDispatch<Dispatch>();

	return (
		<div className={css.container}>
			<Drawer
				title="图表"
				defaultExpand
			>
				<ChartSelector 
					data={charts}
					onChange={(c => dispatch.optionForm.updateCharts(c))}
				/>
			</Drawer>
			<Drawer title="标题" defaultExpand>
				<TitleForm />
			</Drawer>
		</div>
	);
}

export default OptionsForm;
