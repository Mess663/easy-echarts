import React from "react";
import { useRecoilState } from "recoil";
import Drawer from "../../components/Drawer";
import ChartSelector from "../../option_components/ChartSelector";
import css from "./index.module.less";
import optionForm from "../../recoil/option_form";
import TitleForm from "../../option_components/TitleForm";

/**
 * 配置项管理表单
 */
function OptionsForm() {
	const [charts, setCharts] = useRecoilState(optionForm.charts);

	return (
		<div className={css.container}>
			<Drawer
				title="图表"
				defaultExpand
			>
				<ChartSelector data={charts} onChange={setCharts} />
			</Drawer>
			<Drawer title="标题" defaultExpand>
				<TitleForm />
			</Drawer>
		</div>
	);
}

export default OptionsForm;
