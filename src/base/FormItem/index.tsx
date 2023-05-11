import classNames from "classnames";
import React from "react";
import { State } from "../../models/options";
import { KeyPaths, ObjectValueNotArray } from "../../types/tools";
import css from "./index.module.less";
import { Chart } from "../../types/biz/chart";

interface Base {
	children: React.ReactNode | React.ReactNode[]
	align?: boolean // 是否水平排布
	className?: string
	desc?: string // 备注信息
}


type SeriesTypeHash = Chart extends infer U ? U extends string ? `series-${U}.type` : never : never;
type TitleProps = {
	title: string | React.ReactNode
	hash: KeyPaths<ObjectValueNotArray<State>, 3> | SeriesTypeHash // ECharts配置项哈希值 https://echarts.apache.org/zh/option.html#title.id
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

const Group = ({ children, title }: {children: React.ReactElement[] | React.ReactElement, title: string}) => {
	return (
		<div className={css.group}>
			<div className={css.gropuTitle}>{title}</div>
			{children}
		</div>
	);
};

FormItem.Group = Group;

export default FormItem;