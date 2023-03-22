import React from "react";
import css from "./index.module.less";
import OptionsBar from "../../components/OptionsBar";

const XAxisForm = () => {
	return (
		<div className={css.container}>
			<OptionsBar
				remove={() => {}}
				removeTitle='删除当前配置'
				tips={`预览区点击标题可编辑：${1}`}
			/>
		</div>
	);
};

export default XAxisForm;