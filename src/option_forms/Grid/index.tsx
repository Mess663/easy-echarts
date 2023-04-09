import React from "react";
import FormItem from "../../base/FormItem";
import { Grid } from "../../types/biz/option";
import { OptionFormProps } from "../type";
import css from "./index.module.less";
import Input from "../../base/Input";
import { Switch } from "antd";
import ColorPicker from "../../base/ColorPicker";
import { isColorString } from "../../tools/color";

const GridForm  = ({ edit, remove, data }: OptionFormProps<Grid>) => {
	const onChange = (newData: Partial<Grid>) => {
		edit({ ...data, ...newData });
	};
	return (
		<div className={css.container}>
			<FormItem
				desc="布局样式生效需开启此项"
				align
				title={"是否显示直角坐标系网格"}
				hash="grid.show"
			>
				<Switch
					checked={data.show ?? false}
					onChange={(flag) => {
						onChange({ show: flag });
					}}
				/>
			</FormItem>

			<FormItem align title={"图形层级"} hash="grid.z">
				<Input
					value={data.z ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ z: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>

			<FormItem align title={"Canvas层级"} hash="grid.zlevel">
				<Input
					value={data.zlevel ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ zlevel: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>

			<FormItem align title={"区域是否包含坐标轴的刻度标签"} hash="grid.containLabel">
				<Switch
					checked={data.containLabel ?? false}
					onChange={(flag) => {
						onChange({ containLabel: flag });
					}}
				/>
			</FormItem>

			<FormItem align title={"背景色"} hash="grid.backgroundColor">
				<ColorPicker
					color={(() => {
						const { backgroundColor } = data;
						return isColorString(backgroundColor) ? backgroundColor : undefined;
					})()}
					onChange={(e) => {
						onChange({ backgroundColor: e.hex });
					}}
				/>
			</FormItem>

			<FormItem align title={"边框色"} hash="grid.borderColor">
				<ColorPicker
					color={(() => {
						const { borderColor } = data;
						return isColorString(borderColor) ? borderColor : undefined;
					})()}
					onChange={(e) => {
						onChange({ borderColor: e.hex });
					}}
				/>
			</FormItem>

			<FormItem align title={"边框宽度"} hash="grid.borderWidth">
				<Input
					value={data.borderWidth ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ borderWidth: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>
		</div>
	);
};


export default GridForm;