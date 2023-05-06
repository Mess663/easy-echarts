import React, { useMemo } from "react";
import css from "./index.module.less";
import { OptionFormProps } from "../type";
import { EchartsRich, XAxis, YAxis } from "../../types/biz/option";
import FormItem from "../../base/FormItem";
import { Select, Switch } from "antd";
import { AxisPosition, AxisTypeEnum } from "../../config/axis";
import Input from "../../base/Input";
import RichTextEditor from "../../components/RichTextEditor";

const xPositionMenu = [
	{ value: AxisPosition.top, label: AxisPosition.top },
	{ value: AxisPosition.bottom, label: AxisPosition.bottom },
];
const yPositionMenu = [
	{ value: AxisPosition.left, label: AxisPosition.left },
	{ value: AxisPosition.right, label: AxisPosition.right }
];

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

const AxisForm = <T extends (XAxis | YAxis)>({ data, edit, isX }: OptionFormProps<T> & {isX?: boolean}) => {
	const onChange = (newData: Partial<XAxis>) => {
		edit({ ...data, ...newData });
	};
	const getHash = (name: keyof XAxis) => {
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

			<FormItem title={"名称"} hash={getHash("name")}>
				<RichTextEditor
					initialValue={name}
					key={data.id}
					placeholder="请输入副标题"
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

			<FormItem align title={"位置"} hash={getHash("position")}>
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

			<FormItem align title={"相对于默认位置的偏移"} hash={getHash("offset")}>
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
		</div>
	);
};

export default AxisForm;