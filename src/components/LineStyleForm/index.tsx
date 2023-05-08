import css from "./index.module.less";
import Input from "../../base/Input";
import { Select } from "antd";
import { get } from "lodash";
import ColorPicker from "../../base/ColorPicker";
import FormItem from "../../base/FormItem";
import ShadowPicker from "../../base/ShadowPicker";
import { LineType, LineCap } from "../../config/line";
import { LineStyle } from "../../types/biz/style";
import { FormItemHash } from "../../option_forms/type";

const axisLineTypeMenu = [
	{ value: LineType.Solid, label: LineType.Solid },
	{ value: LineType.Dashed, label: LineType.Dashed },
	{ value: LineType.Dotted, label: LineType.Dotted }
];
const axisLineCapMenu = [
	{ value: LineCap.Butt, label: LineCap.Butt },
	{ value: LineCap.Round, label: LineCap.Round },
	{ value: LineCap.Square, label: LineCap.Square }
];

interface Props {
	data?: LineStyle
	hashPrefix: FormItemHash // 属性前缀
	onChange(d: Partial<LineStyle>): void
}

const LineStyleForm = ({ data, onChange, hashPrefix }: Props) => {
	const getHash = (name: keyof LineStyle) => {
		return `${hashPrefix}.lineStyle.${name}` as FormItemHash;
	};
	const modify = (d: Partial<LineStyle>) => {
		onChange({ ...data, ...d });
	};

	return (
		<>
			<FormItem align title={"轴线颜色"} hash={getHash("color")}>
				<ColorPicker
					color={get(data, "color", "#333") as string}
					onChange={(color) => {
						modify({ "color": color.hex });
					}}
				/>
			</FormItem>

			<FormItem align title={"轴线宽度"} hash={getHash("width")}>
				<Input
					value={get(data, "width") ?? 1}
					type='number'
					placeholder="输入数字"
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						modify({ "width": n });
					}}
				/>
			</FormItem>

			<FormItem align title={"轴线类型"} hash={getHash("type")}>
				<Select
					defaultValue={LineType.Solid}
					value={data?.type ?? LineType.Solid}
					options={axisLineTypeMenu}
					onChange={(type) => {
						modify({ type });
					}}
					style={{ width: 90 }}
				/>
			</FormItem>

			<FormItem title={"设置虚线的偏移量"} hash={getHash("dashOffset")}>
				<Input
					value={get(data, "dashOffset", 0)}
					type='number'
					placeholder="输入数字"
					disabled={get(data, "type") !== LineType.Dashed}
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						modify({ "dashOffset": n });
					}}
				/>
			</FormItem>

			<FormItem align title={"轴线段末端的绘制方式"} hash={getHash("cap")}>
				<Select
					defaultValue={LineCap.Butt}
					value={data?.cap ?? LineCap.Butt}
					options={axisLineCapMenu}
					onChange={(cap) => {
						modify({ cap });
					}}
					style={{ width: 90 }}
				/>
			</FormItem>

			<FormItem align title={"轴线阴影"} hash={getHash("shadowColor")}>
				<ShadowPicker
					shadow={{
						shadowColor: get(data, "shadowColor", "transparent"),
						shadowBlur: get(data, "shadowBlur", 0),
						shadowOffsetX: get(data, "shadowOffsetX", 0),
						shadowOffsetY: get(data, "shadowOffsetY", 0)
					}}
					onChange={(shadow) => {
						const newLineStyle = { ...data };
						if (shadow) {
							onChange(shadow);
						}
						else {
							delete newLineStyle.shadowColor;
							delete newLineStyle.shadowBlur;
							delete newLineStyle.shadowOffsetX;
							delete newLineStyle.shadowOffsetY;
						}
						onChange(newLineStyle);
					}}
				>
					<div className={css.rect} style={{ backgroundColor: get(data, "shadowColor") }}/>
				</ShadowPicker>
			</FormItem>

			<FormItem align title={"透明度"} hash={getHash("opacity")}>
				<Input
					value={get(data, "opacity", 1) * 1000}
					type='range'
					max={1000}
					min={0}
					style={{ padding: 0 }}
					onInput={(e) => {
						const n = Number(e.currentTarget.value);
						modify({ "opacity": n / 1000 });
					}}
				/>
			</FormItem>
		</>
	);
};

export default LineStyleForm;