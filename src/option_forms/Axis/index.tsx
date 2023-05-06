/**
 * TODO 暂未支持的配置：
 * 1.boundaryGap 通过表单不好配置
 * 2.min/max 功能不完整
 * 3.scale ts没推导出这个属性，很奇怪，暂时不搞
 */

import React, { useMemo } from "react";
import css from "./index.module.less";
import { OptionFormProps } from "../type";
import { EchartsRich, XAxis, YAxis } from "../../types/biz/option";
import FormItem from "../../base/FormItem";
import { Select, Switch } from "antd";
import { AxisNameLocation, AxisPosition, AxisTypeEnum } from "../../config/axis";
import Input from "../../base/Input";
import RichTextEditor from "../../components/RichTextEditor";

type FormItemHash = React.ComponentProps<typeof FormItem>["hash"]

const subTitleConfig: {wrapText: (t: string) => string, rich: EchartsRich} = {
	wrapText: (t: string) => `{default|${t}}`,
	rich: {
		default: {
			color: "#333",
			fontSize: 12,
			fontFamily: "sans-serif"
		}
	}
};

const xPositionMenu = [
	{ value: AxisPosition.top, label: AxisPosition.top },
	{ value: AxisPosition.bottom, label: AxisPosition.bottom },
];
const yPositionMenu = [
	{ value: AxisPosition.left, label: AxisPosition.left },
	{ value: AxisPosition.right, label: AxisPosition.right }
];
export const nameLocationMenu = [
	{ value: AxisNameLocation.start, label: AxisNameLocation.start },
	{ value: AxisNameLocation.middle, label: AxisNameLocation.middle },
	{ value: AxisNameLocation.end, label: AxisNameLocation.end }
];

const AxisForm = <T extends (XAxis | YAxis)>({ data, edit, isX }: OptionFormProps<T> & {isX?: boolean}) => {
	const onChange = (newData: Partial<XAxis>) => {
		edit({ ...data, ...newData });
	};
	const getHash = (name: keyof XAxis | keyof YAxis) => {
		const axisName = isX ? "xAxis" : "yAxis";
		return `${axisName}.${name}` as FormItemHash;
	};
	const defaultPosition = isX ? AxisPosition.bottom : AxisPosition.left;
	const defaultType = isX ? AxisTypeEnum.Category.code : AxisTypeEnum.Value.code;
	const name = useMemo(() => {
		if (data.nameTextStyle?.rich) {
			return RichTextEditor.transformToSchema(data.name ?? "", data.nameTextStyle.rich);
		}
		return RichTextEditor.transformToSchema(subTitleConfig.wrapText(data.name ?? "坐标轴名称"), subTitleConfig.rich);
	}, [data.name, data.nameTextStyle?.rich]);

	return (
		<div className={css.container}>
			<FormItem align title={"是否展示"} hash={getHash("show")}>
				<Switch
					checked={data.show ?? true}
					onChange={(show) => {
						onChange({ show });
					}}
				/>
			</FormItem>

			<FormItem title={"坐标轴名称"} hash={getHash("name")}>
				<RichTextEditor
					initialValue={name}
					key={data.id}
					placeholder="请输入"
					onChange={(e) => {
						const op = RichTextEditor.transformToRich(e);
						onChange ({
							name: op.text,
							nameTextStyle: {
								rich: op.style,
							}
						});
					}}
				/>
			</FormItem>

			<FormItem title={"坐标轴名字旋转的角度值"} hash={getHash("nameRotate")}>
				<Input
					value={data.nameRotate ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ nameRotate: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>

			<FormItem align title={"坐标轴名称显示位置"} hash={getHash("nameLocation")}>
				<Select
					defaultValue={defaultPosition}
					value={data.position ?? defaultPosition}
					options={isX ? xPositionMenu : yPositionMenu}
					onChange={(position) => {
						onChange({ position });
					}}
					style={{ width: 90 }}
				/>
			</FormItem>

			<FormItem align title={"坐标轴位置"} hash={getHash("position")}>
				<Select
					defaultValue={defaultPosition}
					value={data.position ?? defaultPosition}
					options={isX ? xPositionMenu : yPositionMenu}
					onChange={(position) => {
						onChange({ position });
					}}
					style={{ width: 90 }}
				/>
			</FormItem>

			<FormItem title={"坐标轴相对于默认位置的偏移"} hash={getHash("offset")}>
				<Input
					value={data.offset ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ offset: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>

			<FormItem align title={"坐标轴类型"} hash={getHash("type")}>
				<Select
					defaultValue={defaultType}
					value={data.type ?? defaultType}
					options={AxisTypeEnum.$map(o => ({ value: o.code, label: o.val }))}
					onChange={(type) => {
						onChange({ type });
					}}
				/>
			</FormItem>

			<FormItem title={"坐标轴名称与轴线之间的距离"} hash={getHash("nameGap")}>
				<Input
					value={data.nameGap ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ nameGap: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>
			
			<FormItem align title={"反向坐标轴"} hash={getHash("inverse")}>
				<Switch
					checked={data.inverse ?? false}
					onChange={(inverse) => {
						onChange({ inverse });
					}}
				/>
			</FormItem>

			<FormItem align title={"坐标轴刻度最小值"} hash={getHash("min")}>
				<Input
					value={Number(data.min) ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ min: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>

			<FormItem align title={"坐标轴刻度最大值"} hash={getHash("max")}>
				<Input
					value={Number(data.max) ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ max: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>

			{/* <FormItem align title={"脱离 0 值比例"} hash={getHash("scale")}>
				<Switch
					checked={data.scale ?? false}
					onChange={(inverse) => {
						onChange({ inverse });
					}}
				/>
			</FormItem> */}

			<FormItem align title={"坐标轴的分割段数"} hash={getHash("splitNumber")}>
				<Input
					value={Number(data.splitNumber) ?? ""}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						onChange({ splitNumber: n > 0 ? n : undefined });
					}}
				/>
			</FormItem>
		</div>
	);
};

export default AxisForm;