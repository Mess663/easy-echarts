import React from "react";
import Drawer from "../../components/Drawer";
import ChartSelector from "../../option_components/ChartSelector";
import css from "./index.module.less";
import { useRecoilState } from "recoil";
import optionForm from "../../recoil/option_form";
import TitleForm from "../../option_components/TitleForm";

/**
 * 配置项管理表单
 */
const OptionsForm = () => {
	const [charts, setCharts] = useRecoilState(optionForm.chartsState);
	
	return (
		<div className={css.container}>
			<Drawer title='图表' defaultExpand> 
				<ChartSelector data={charts} onChange={setCharts} />
			</Drawer>
			<Drawer title='标题' defaultExpand>
				<TitleForm />
			</Drawer>
		</div>
	);
};

export default OptionsForm;