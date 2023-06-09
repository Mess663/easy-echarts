/**
 * TODO: 暂未支持的配置：
 * 1.boundaryGap 通过表单不好配置
 * 2.min/max 功能不完整
 * 3.scale ts没推导出这个属性，很奇怪，暂时不搞
 * 4.axisLine.symbolSize 有两个属性共同作用，单一配置时，另一个属性由于没默认值会导致显示不达预期
 * 5.所有interval属性都暂时不支持，因为这个配置过于复杂，用户可能不需要
 */

import React, { useMemo } from "react";
import css from "./index.module.less";
import { FormItemHash, OptionFormProps } from "../type";
import { EchartsRich, XAxis, YAxis } from "../../types/biz/option";
import FormItem from "../../base/FormItem";
import { Button, Select, Space, Switch, Typography } from "antd";
import { AxisPosition, AxisTypeEnum } from "../../config/axis";
import Input from "../../base/Input";
import RichTextEditor from "../../components/RichTextEditor";
import { KeyPaths, ObjectValueNotArray } from "../../types/tools";
import { get, mapValues } from "lodash";
import { omit as fpOmit } from "lodash/fp";
import LineStyleForm from "../../components/LineStyleForm";
import { LeftValueSign, RightValueSign, unifyString } from "../../config/text";
import AreaStyleForm from "../../components/AreaStyleForm";

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

type Props<T> = OptionFormProps<T> & {isX?: boolean}

const AxisForm = <T extends (XAxis | YAxis)>({ data, edit, isX }: Props<T>) => {
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
	const label = useMemo(() => {
		const defaultStr = unifyString("value");
		if (data.axisLabel?.rich) {
			return RichTextEditor.transformToSchema(get(data, "axisLabel.formatter", defaultStr) as string, data.axisLabel.rich);
		}
		return RichTextEditor.transformToSchema(subTitleConfig.wrapText(get(data, "axisLabel.formatter", defaultStr) as string), subTitleConfig.rich);
	}, [data]);

	const onChange = (newData: Partial<XAxis>) => {
		edit({ ...data, ...newData });
	};

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

	const onChangeAxisTick = <T,>(key: (keyof NonNullable<XAxis["axisTick"]>) | "alignWithLabel", val: T) => {
		edit({
			...data,
			axisTick: {
				...data.axisTick,
				[key]: val
			}
		});
	};

	const onChangeAxisLabel = <T,>(key: (keyof NonNullable<XAxis["axisLabel"]>) | "formatter", val: T) => {
		edit({
			...data,
			axisLabel: {
				...data.axisLabel,
				[key]: val
			}
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

			<FormItem align title={"图形层级"} hash={getHash("z")}>
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

			<FormItem align title={"Canvas层级"} hash={getHash("zlevel")}>
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

			<FormItem.Group title="坐标轴刻度">
				<FormItem align title={"是否展示"} hash={getHash("axisTick.show")}>
					<Switch
						checked={Boolean(data.axisTick?.show ?? true)}
						onChange={(bool) => {
							onChangeAxisTick("show", bool);
						}}
					/>
				</FormItem>

				<FormItem align title={"刻度线和标签对齐"} hash={getHash("axisTick.alignWithLabel")}>
					<Switch
						checked={get(data, "axisTick.alignWithLabel", true) as boolean}
						onChange={(bool) => {
							onChangeAxisTick("alignWithLabel", bool);
						}}
					/>
				</FormItem>

				<FormItem align title={"刻度朝内"} hash={getHash("axisTick.inside")}>
					<Switch
						checked={get(data, "axisTick.inside", false)}
						onChange={(bool) => {
							onChangeAxisTick("inside", bool);
						}}
					/>
				</FormItem>

				<FormItem title={"刻度线的长度"} hash={getHash("axisTick.length")}>
					<Input
						value={get(data, "axisTick.length", 5)}
						type='number'
						placeholder="输入数字"
						onInput={(e) => {
							const n = Number(e.currentTarget.value);
							onChangeAxisTick("length", n);
						}}
					/>
				</FormItem>

				<LineStyleForm
					data={data.axisTick?.lineStyle}
					hashPrefix={(isX ? "xAxis.axisTick" : "yAxis.axisTick")}
					onChange={(lineStyle) => {
						onChangeAxisTick("lineStyle", lineStyle);
					}}
				/>
			</FormItem.Group>

			<FormItem.Group title="坐标轴刻度标签">
				<FormItem align title={"是否展示"} hash={getHash("axisLabel.show")}>
					<Switch
						checked={data.axisLabel?.show ?? true}
						onChange={(bool) => {
							onChangeAxisLabel("show", bool);
						}}
					/>
				</FormItem>

				<FormItem title={(
					<div>
					标签内容<Typography.Text type="secondary"> ($-value-$为标签内容占位符)</Typography.Text>
					</div>
				)}
				hash={getHash("axisLabel")}
				>
					<RichTextEditor
						initialValue={label}
						key={data.id}
						placeholder="请输入"
						onChange={(e) => {
							const op = RichTextEditor.transformToRich(e);
							edit({
								...data,
								axisLabel: {
									...data.axisLabel,
									formatter: op.text.replace(LeftValueSign, "{").replace(RightValueSign, "}"),
									rich: mapValues(op.style, fpOmit("text")),
								}
							});
						}}
					/>
				</FormItem>

				<FormItem align title={"标签朝内"} hash={getHash("axisLabel.inside")}>
					<Switch
						checked={data.axisLabel?.inside ?? false}
						onChange={(bool) => {
							onChangeAxisLabel("inside", bool);
						}}
					/>
				</FormItem>

				<FormItem align title={"隐藏重叠的标签"} hash={getHash("axisLabel.hideOverlap")}>
					<Switch
						checked={data.axisLabel?.hideOverlap}
						onChange={(bool) => {
							onChangeAxisLabel("hideOverlap", bool);
						}}
					/>
				</FormItem>

				<FormItem align title={"标签旋转的角度"} hash={getHash("axisLabel.rotate")}>
					<Space>
						<Input
							value={data.axisLabel?.rotate ?? 0}
							type="range"
							placeholder="输入数字"
							min={-90}
							max={90}
							style={{ padding: 0 }}
							onInput={(e) => {
								const n = Number(e.currentTarget.value);
								onChangeAxisLabel("rotate", n);
							}}
						/>
						<Button onClick={() => {
							onChangeAxisLabel("rotate", 0);
						}}
						>重置</Button>
					</Space>
				</FormItem>

				<FormItem title={"标签与轴线距离"} hash={getHash("axisLabel.margin")}>
					<Input
						value={data.axisLabel?.margin ?? 8}
						type='number'
						placeholder="输入数字"
						onInput={(e) => {
							const n = Number(e.currentTarget.value);
							onChangeAxisLabel("margin", n);
						}}
					/>
				</FormItem>
			</FormItem.Group>

			<FormItem.Group title="坐标轴在 grid 区域中的分隔线">
				<FormItem align title={"显示分隔线"} hash={getHash("splitLine.show")}>
					<Switch
						checked={data.splitLine?.show}
						onChange={(bool) => {
							edit({
								...data,
								splitLine: {
									...data.splitLine,
									show: bool
								}
							});
						}}
					/>
				</FormItem>

				<LineStyleForm
					data={data.splitLine?.lineStyle}
					hashPrefix={(isX ? "xAxis.splitLine" : "yAxis.splitLine")}
					onChange={(lineStyle) => {
						edit({
							...data,
							splitLine: {
								...data.splitLine,
								lineStyle
							}
						});
					}}
				/>
			</FormItem.Group>

			<FormItem.Group title="坐标轴在 grid 区域中的分隔区域">
				<FormItem align title={"显示分隔区域"} hash={getHash("splitArea.show")}>
					<Switch
						checked={data.splitArea?.show}
						onChange={(bool) => {
							edit({
								...data,
								splitArea: {
									...data.splitLine,
									show: bool
								}
							});
						}}
					/>
				</FormItem>

				<AreaStyleForm
					data={data.splitArea?.areaStyle}
					hashPrefix={(isX ? "xAxis.splitArea" : "yAxis.splitArea")}
					onChange={(areaStyle) => {
						edit({
							...data,
							splitArea: {
								...data.splitArea,
								areaStyle
							}
						});
					}}
				/>
			</FormItem.Group>
		</div>
	);
};

export default React.memo(AxisForm) as typeof AxisForm;
// export default AxisForm;
