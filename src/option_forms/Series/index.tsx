import React from "react";
import FormItem from "../../base/FormItem";
import ChartSelector from "../../components/ChartSelector";
import { Series } from "../../types/biz/option";
import { OptionFormProps } from "../type";
import css from "./index.module.less";
import Input from "../../base/Input";
import { Select } from "antd";

type Hash = React.ComponentProps<typeof FormItem>["hash"]

interface Props extends OptionFormProps<Series> {
	xAxisLength: number,
	yAxisLength: number
}

const SeriesForm  = ({ data, edit, xAxisLength, yAxisLength }: Props) => {
	const hash = "series-" + data.type + ".type" as Hash;
	const onChange = <K extends keyof Series>(key: K, value: Series[K]) => {
		edit({
			...data,
			[key]: value
		});
	};
	return (
		<div className={css.container}>
			<FormItem align title="图形类型：" hash={hash}>
				<ChartSelector data={data} onChange={edit} />
			</FormItem>

			<FormItem align title="系列名称：" hash="series.name">
				<Input
					value={data.name}
					placeholder="请输入系列名称"
					onInput={(e) => {
						onChange("name", e.currentTarget.value);
					}}
				/>
			</FormItem>

			<FormItem align title="使用的 x 轴" hash="series.xAxisIndex">
				<Select
					value={data.xAxisIndex ?? 0}
					onChange={(value) => {
						onChange("xAxisIndex", value);
					}}
					options={Array.from({ length: xAxisLength }, (_, index) => ({
						label: index + 1, value: index
					}))}
				/>
			</FormItem>

			<FormItem align title="使用的 y 轴" hash="series.yAxisIndex">
				<Select
					value={data.yAxisIndex ?? 0}
					onChange={(value) => {
						onChange("yAxisIndex", value);
					}}
					options={Array.from({ length: yAxisLength }, (_, index) => ({
						label: index + 1, value: index
					}))}
				/>
			</FormItem>
		</div>
	);
};

export default SeriesForm;