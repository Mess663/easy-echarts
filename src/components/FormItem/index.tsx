import React from "react";
import css from "./index.module.less";

interface Props {
	title: string | React.ReactNode
	children: React.ReactNode | React.ReactNode[]
	//   hash?: string // ECharts配置项哈希值 https://echarts.apache.org/zh/option.html#title.id
}

/** 
 * 配置项表单的单项组件
 */
const FormItem = ({ title, children }: Props) => {
	return (
		<div className={css.container}>
			<div className={css.title}>
				{title}
			</div>
			<div className={css.item}>
				{children}
			</div>
		</div>
	);
};

export default FormItem;