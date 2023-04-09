import classNames from "classnames";
import React from "react";
import { State } from "../../models/options";
import { KeyPaths, ObjectValueNotArray } from "../../types/tools";
import css from "./index.module.less";

interface Base {
	children: React.ReactNode | React.ReactNode[]
	align?: boolean // 是否水平排布
	className?: string
	desc?: string // 备注信息
}

type TitleProps = {
	title: string | React.ReactNode
	hash: KeyPaths<ObjectValueNotArray<State>> // ECharts配置项哈希值 https://echarts.apache.org/zh/option.html#title.id
}

type Props = (Base & Partial<TitleProps>) | (TitleProps & Base);

interface FormItem extends React.FC<Props> {
	(props: Base): JSX.Element
	(props: TitleProps & Base): JSX.Element
}


/**
 * 配置项表单的单项组件
 */
function FormItem (props: Base): JSX.Element;
function FormItem (props: TitleProps & Base): JSX.Element;
function FormItem ({ title, className, children, align = false, hash, desc }: Props) {
	return (
		<div
			className={css.container}
		>
			<div
				className={classNames(css.content, {
					[css.align]: align,
					[css.haveDesc]: Boolean(desc)
				}, className)}
			>
				{
					Boolean(title) && (
						<a
							className={css.title}
							title="点击跳转官网文档"
							href={"https://echarts.apache.org/zh/option.html#" + hash}
							target="_blank"
							rel="noreferrer"
						>
							{title}
						</a>
					)
				}
				<div className={css.item}>
					{children}
				</div>
			</div>
			{
				desc ? (
					<div className={css.desc}>
						{desc}
					</div>
				)
					: null
			}
		</div>
	);
}

export default FormItem;