import React, { useCallback, useEffect } from "react";
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
	const titleOptions = useSelector((state: RootState) => state.optionForm.title);
	const dispatch = useDispatch<Dispatch>();

	return (
		<div className={css.container}>
			<Drawer
				title="图表"
				defaultOpen
			>
				<ChartSelector
					data={charts}
					onChange={c => dispatch.optionForm.updateCharts(c)}
				/>
			</Drawer>
			<Drawer title="标题"
				defaultOpen
				extra={(
					<span
						onClick={(e) => {
							e.stopPropagation();
							dispatch.optionForm.addTitle({
								text: "标题",
							});
						}}
						className={css.addTitle}
					>添加标题</span>
				)}
			>
				<TitleForm
					data={titleOptions}
					add={(d) => {
						dispatch.optionForm.addTitle(d);
					}}
					edit={(d) => {
						dispatch.optionForm.modifyTitle(d);
					}}
					remove={(_key) => {
						dispatch.optionForm.removeTitle(_key);
					}}
				/>
			</Drawer>
		</div>
	);
}

export default OptionsForm;
