import React from "react";
import FormItem from "../../base/FormItem";
import ChartSelector from "../../components/ChartSelector";
import { Grid, Series, XAxis, YAxis } from "../../types/biz/option";
import { OptionFormProps } from "../type";
import css from "./index.module.less";
import Input from "../../base/Input";
import { Select, Switch } from "antd";
import ColorPicker from "../../base/ColorPicker";
import { map, pick } from "lodash";
import { mockSeries } from "../../logic/init_option";
import { ChartEnumify } from "../../types/biz/chart";

type Hash = React.ComponentProps<typeof FormItem>["hash"]

interface Props extends OptionFormProps<Series> {
	xAxis: XAxis[]
	yAxis: YAxis[]
	grid: Grid
	dataCount: number // 数据量
}

const SeriesForm  = ({ data, edit, xAxis, yAxis, grid, dataCount }: Props) => {
	const hash = "series-" + data.type + ".type" as Hash;
	const onChange = <K extends keyof Series>(key: K, value: Series[K]) => {
		edit({
			...data,
			[key]: value,
		});
	};
	return (
		<div className={css.container}>
			<FormItem align title="图形类型：" hash={hash}>
				<ChartSelector
					data={data}
					onChange={(d) => {
						const sizeOption = {
							...pick(grid, ["left", "top", "right", "bottom"])
						};
						edit({
							...d,
							data: mockSeries(dataCount, d.type),
							...(ChartEnumify.$getEnumVal(d.type).isObjectData ? sizeOption : {})
						});
					}}
				/>
			</FormItem>

			<FormItem align title="系列名称：" hash="series.name">
				<Input
					value={data.name ?? ""}
					placeholder="请输入系列名称"
					onInput={(e) => {
						onChange("name", e.currentTarget.value);
					}}
				/>
			</FormItem>

			<FormItem align title="使用的 x 轴" hash="series.xAxisIndex">
				<Select
					value={data.xAxisId ? map(xAxis, "id").indexOf(data.xAxisId) : 0}
					onChange={(index) => {
						onChange("xAxisId", xAxis[index].id);
					}}
					options={Array.from({ length: xAxis.length }, (_, index) => ({
						label: index + 1, value: index
					}))}
				/>
			</FormItem>

			<FormItem align title="使用的 y 轴" hash="series.yAxisIndex">
				<Select
					value={data.yAxisId ? map(yAxis, "id").indexOf(data.yAxisId) : 0}
					onChange={(index) => {
						onChange("yAxisId", yAxis[index].id);
					}}
					options={Array.from({ length: yAxis.length }, (_, index) => ({
						label: index + 1, value: index
					}))}
				/>
			</FormItem>

			<FormItem align title={"图形层级"} hash="series.z">
				<Input
					value={data.z ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange("z", n > 0 ? n : undefined );
					}}
				/>
			</FormItem>

			<FormItem align title={"Canvas层级"} hash="series.zlevel">
				<Input
					value={data.zlevel ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange("zlevel", n > 0 ? n : undefined);
					}}
				/>
			</FormItem>

			<FormItem align title={"图形颜色"} hash="series.itemStyle.color">
				<ColorPicker
					color={String(data.itemStyle?.color) ?? "transparent"}
					onChange={(color) => {
						onChange("itemStyle", { ...data.itemStyle, color: color.hex });
					}}
				/>
			</FormItem>

			<FormItem align title={"不响应和触发鼠标事件"} hash="series.silent">
				<Switch
					checked={data.silent ?? false}
					onChange={(checked) => {
						onChange("silent", checked);
					}}
				/>
			</FormItem>
			
			<FormItem align title={"开启动画"} hash="series.animation">
				<Switch
					checked={data.animation ?? true}
					onChange={(checked) => {
						onChange("animation", checked);
					}}
				/>
			</FormItem>
		</div>
	);
};

export default React.memo(SeriesForm);