import React from "react";
import IconSvg from "../../base/IconSvg";
import css from "./index.module.less";

interface Props {
	// 删除按钮的文字
	removeTitle: string;
	// 删除按钮点击事件
	remove: () => void;

	// 组件索引选择引导
	tips?: string;
}

/**
 * ECharts组件配置项管理（包括删除、选中）
 */
const OptionsBar = ({ remove, removeTitle, tips }: Props) => {
	return (
		<div className={css.container}>
			<button
				className={css.removeBtn}
				onClick={remove}
			>
				<IconSvg className={css.icon} name="icon-shanchu" />
				删除当前配置</button>
			<div className={css.tips}>
				{tips}
			</div>
		</div>
	);
};

export default OptionsBar;