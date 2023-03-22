import classNames from "classnames";
import React from "react";
import css from "./index.module.less";

interface Props {
	title?: string | React.ReactNode
	children: React.ReactNode | React.ReactNode[]
	align?: boolean // 是否水平排布
	className?: string
	//   hash?: string // ECharts配置项哈希值 https://echarts.apache.org/zh/option.html#title.id
}

/**
 * 配置项表单的单项组件
 */
const FormItem = ({ title, className, children, align = false }: Props) => {
	return (
		<div
			className={classNames(css.container, {
				[css.align]: align
			}, className)}
		>
			{
				Boolean(title) && (
					<div className={css.title}>
						{title}
					</div>
				)
			}
			<div className={css.item}>
				{children}
			</div>
		</div>
	);
};

export default FormItem;