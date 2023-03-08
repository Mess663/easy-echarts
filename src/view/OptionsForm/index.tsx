import React from "react";
import Drawer from "../../components/Drawer";
import ChartSelector from "../../option_components/ChartSelector";
import css from "./index.module.less";

/**
 * 配置项管理表单
 */
const OptionsForm = () => {
	return (
		<div className={css.container}>
			<Drawer title='图表' defaultExpand> 
				<ChartSelector />
			</Drawer>
			<Drawer title='标题'>
			123
			</Drawer>
		</div>
	);
};

export default OptionsForm;