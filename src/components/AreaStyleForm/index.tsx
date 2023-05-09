import React from "react";
import css from "./index.module.less";
import FormItem from "../../base/FormItem";
import ColorPicker from "../../base/ColorPicker";
import { AreaStyle } from "../../types/biz/style";
import { FormItemHash } from "../../option_forms/type";
import ShadowPicker from "../../base/ShadowPicker";
import { cloneDeep, get } from "lodash";
import { Button, Space } from "antd";
import Input from "../../base/Input";

interface Props {
	data?: AreaStyle
	hashPrefix: FormItemHash // 属性前缀
	onChange(d: Partial<AreaStyle>): void
}

const AreaStyleForm = ({ data, hashPrefix, onChange }: Props) => {
	const getHash = (name: keyof AreaStyle) => {
		return `${hashPrefix}.areaStyle.${name}` as FormItemHash;
	};
	const modify = (d: Partial<AreaStyle>) => {
		onChange({ ...data, ...d });
	};
	return (
		<>
			<FormItem align title={"区域颜色"} hash={getHash("color")}>
				<Space>
					{
						data?.color?.map((c, i) => {
							return (
								<ColorPicker
									color={c as string}
									key={i}
									onChange={(color) => {
										const newColor = cloneDeep(data.color) || [];
										newColor[i] = color.hex;
										modify({ "color": newColor });
									}}
								/>
							);
						})
					}
					<Button onClick={() => {
						modify({ "color": [...get(data, "color", []), "transparent"] });
					}}
					>添加</Button>
				</Space>
			</FormItem>

			<FormItem align title={"区域阴影"} hash={getHash("shadowColor")}>
				<ShadowPicker
					shadow={{
						shadowColor: get(data, "shadowColor", "transparent"),
						shadowBlur: get(data, "shadowBlur", 0),
						shadowOffsetX: get(data, "shadowOffsetX", 0),
						shadowOffsetY: get(data, "shadowOffsetY", 0)
					}}
					onChange={(shadow) => {
						const newStyle = { ...data } as Partial<AreaStyle>;
						if (shadow) {
							onChange(shadow);
						}
						else {
							delete newStyle.shadowColor;
							delete newStyle.shadowBlur;
							delete newStyle.shadowOffsetX;
							delete newStyle.shadowOffsetY;
							onChange(newStyle);
						}
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

export default AreaStyleForm;