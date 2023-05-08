/**
 * TODO: 暂未支持的配置：
 * 1.boundaryGap 通过表单不好配置
 * 2.min/max 功能不完整
 * 3.scale ts没推导出这个属性，很奇怪，暂时不搞
 * 4.axisLine.symbolSize 有两个属性共同作用，单一配置时，另一个属性由于没默认值会导致显示不达预期
 */

import React, { useMemo } from "react";
import css from "./index.module.less";
import { FormItemHash, OptionFormProps } from "../type";
import { EchartsRich, XAxis, YAxis } from "../../types/biz/option";
import FormItem from "../../base/FormItem";
import { Select, Space, Switch } from "antd";
import { AxisPosition, AxisTypeEnum } from "../../config/axis";
import Input from "../../base/Input";
import RichTextEditor from "../../components/RichTextEditor";
import { KeyPaths, ObjectValueNotArray } from "../../types/tools";
import { get } from "lodash";
import LineStyleForm from "../../components/LineStyleForm";

// 通过数组方式配置，索引代表属性在data中的位置
enum SymbolArrowIndex { left = 0, right = 1 }
enum SymbolSizeIndex { width = 0, height = 1 }

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
// const nameLocationMenu = [
// 	{ value: AxisNameLocation.start, label: AxisNameLocation.start },
// 	{ value: AxisNameLocation.middle, label: AxisNameLocation.middle },
// 	{ value: AxisNameLocation.end, label: AxisNameLocation.end }
// ];

const AxisForm = <T extends (XAxis | YAxis)>({ data, edit, isX }: OptionFormProps<T> & {isX?: boolean}) => {
	const onChange = (newData: Partial<XAxis>) => {
		edit({ ...data, ...newData });
	};
	const getHash = (name: keyof XAxis | keyof YAxis | KeyPaths<ObjectValueNotArray<XAxis>, 3>) => {
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
	const onChangeSymbol = (index: SymbolArrowIndex) => (flag: boolean) => {
		const newSymbol = [...data.axisLine?.symbol ?? []];
		newSymbol[index] = flag ? "arrow" : "none";
		edit({
			...data,
			axisLine: { ...data.axisLine, symbol: newSymbol }
		});
	};
	// 处理axisline内的数字数组配置
	const onChangeAxisLineNumber = (index: number, prop: keyof NonNullable<XAxis["axisLine"]>) => (e: React.FormEvent<HTMLInputElement>) => {
		const n = Number(e.currentTarget.value);
		const newConfigArr = [...get(data, ["axisLine", prop], [0, 0]) as number[]];
		newConfigArr[index] = n;
		edit({
			...data,
			axisLine: { ...data.axisLine, [prop]: newConfigArr }
		});
	};

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
					value={data.min ? Number(data.min) : undefined}
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
					value={data.max ? Number(data.max) : undefined}
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

			<FormItem.Group title="坐标轴名称">
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

				<FormItem title={"旋转的角度值"} hash={getHash("nameRotate")}>
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

				<FormItem align title={"显示位置"} hash={getHash("nameLocation")}>
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
			</FormItem.Group>

			<FormItem.Group title="轴线">
				<FormItem align title={"显示坐标轴轴线"} hash={getHash("axisLine.show")}>
					<Switch
						checked={Boolean(data.axisLine?.show ?? (isX ? true : false))}
						onChange={(show) => {
							edit({
								...data,
								axisLine: { ...data.axisLine, show }
							});
						}}
					/>
				</FormItem>

				<FormItem align title={"是否在另一个轴的 0 刻度上"} hash={getHash("axisLine.onZero")}>
					<Switch
						checked={Boolean(data.axisLine?.onZero ?? true)}
						onChange={(onZero) => {
							edit({
								...data,
								axisLine: { ...data.axisLine,  onZero  }
							});
						}}
					/>
				</FormItem>

				<FormItem title={"轴线两边显示箭头"} hash={getHash("axisLine.symbol")}>
					<Space>
						{(isX ? "左侧" : "下侧") + "箭头："}
						<Switch
							checked={get(data, ["axisLine", "symbol", SymbolArrowIndex.left]) === "arrow"}
							onChange={onChangeSymbol(SymbolArrowIndex.left)}
						/>
						{(isX ? "右侧" : "上侧") + "箭头："}
						<Switch
							checked={get(data, ["axisLine", "symbol", SymbolArrowIndex.right]) === "arrow"}
							onChange={onChangeSymbol(SymbolArrowIndex.right)}
						/>
					</Space>
				</FormItem>

				<FormItem title={"轴线箭头的大小"} hash={getHash("axisLine.symbolSize")}>
					<Space>
						宽度：
						<Input
							value={get(data, ["axisLine", "symbolSize", SymbolSizeIndex.width]) ?? 10}
							type='number'
							placeholder="输入数字"
							onInput={onChangeAxisLineNumber(SymbolSizeIndex.width, "symbolSize")}
						/>
					</Space>
					<Space style={{ marginTop: 4 }}>
						高度：
						<Input
							value={get(data, ["axisLine", "symbolSize", SymbolSizeIndex.height]) ?? 15}
							type='number'
							placeholder="输入数字"
							onInput={onChangeAxisLineNumber(SymbolSizeIndex.height, "symbolSize")}
						/>
					</Space>
				</FormItem>

				<FormItem title={"轴线箭头的位置偏移"} hash={getHash("axisLine.symbolOffset")}>
					<Space>
						{(isX ? "左侧" : "下侧") + "箭头："}
						<Input
							value={get(data, ["axisLine", "symbolOffset", SymbolArrowIndex.left]) ?? 0}
							type='number'
							placeholder="输入数字"
							onInput={onChangeAxisLineNumber(SymbolArrowIndex.left, "symbolOffset")}
						/>
					</Space>
					<Space style={{ marginTop: 4 }}>
						{(isX ? "右侧" : "上侧") + "箭头："}
						<Input
							value={get(data, ["axisLine", "symbolOffset", SymbolArrowIndex.right]) ?? 0}
							type='number'
							placeholder="输入数字"
							onInput={onChangeAxisLineNumber(SymbolArrowIndex.right, "symbolOffset")}
						/>
					</Space>
				</FormItem>

				<LineStyleForm
					data={data.axisLine?.lineStyle}
					hashPrefix={(isX ? "xAxis.axisLine" : "yAxis.axisLine")}
					onChange={(lineStyle) => {
						edit({
							...data,
							axisLine: {
								...data.axisLine,
								lineStyle
							}
						});
					}}
				/>
			</FormItem.Group>
		</div>
	);
};

export default AxisForm;