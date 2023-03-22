import { last, startsWith } from "lodash";
import React from "react";
import ColorPicker from "../../../../base/ColorPicker";
import IconSvg from "../../../../base/IconSvg";
import Input from "../../../../base/Input";
import Popover from "../../../../base/Popover";
import { isColorString } from "../../../../tools/color";
import ToolBtn from "../../components/ToolBtn";
import { PluginProps, ToCssStyle, ToolPlugin, ToRichStyle } from "../type";
import css from "./index.module.less";

type ShadowRichStyle = ReturnType<typeof toRichStyle>

const PxElement = () => <span className={css.px}>px</span>;
const toRichStyle = (cssTextShadow: string) => {
	const config = cssTextShadow.match(/\d+|#[\da-f]{3,6}/g);
	const color = last(config);
	return {
		textShadowOffsetX: Number(config?.[0]) || 0,
		textShadowOffsetY: Number(config?.[1]) || 0,
		textShadowBlur: Number(config?.[2]) || 0,
		textShadowColor: isColorString(color) ? color : "transparent"
	};
};
const toCssStyle = (richStyle: Partial<ShadowRichStyle>) => {
	const { textShadowOffsetX, textShadowOffsetY, textShadowBlur, textShadowColor } = richStyle;
	return `${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowBlur}px ${textShadowColor}`;
};

const TextShadow: ToolPlugin = ({ marks, editor }: PluginProps) => {
	const shadow = toRichStyle(marks?.textShadow || "");
	const onChange = (e: Partial<ShadowRichStyle>) => {
		const newShadow = { ...shadow, ...e };
		editor.addMark("textShadow", toCssStyle(newShadow));
	};
	const onInput = (key: keyof Omit<ShadowRichStyle, "textShadowColor">) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.currentTarget.value);
		onChange({ [key]: value });
	};
	return (
		<Popover
			panel={(
				<div className={css.panel}>
					<div className={css.item} >
					X：
						<Input
							value={shadow.textShadowOffsetX}
							onInput={onInput("textShadowOffsetX")}
						/>
						<PxElement />
					</div>
					<div className={css.item}>
					Y：
						<Input
							value={shadow.textShadowOffsetY}
							onInput={onInput("textShadowOffsetY")}
						/>
						<PxElement />
					</div>
					<div className={css.item}>
					模糊度：
						<Input
							value={shadow.textShadowBlur}
							onInput={onInput("textShadowBlur")}
						/>
						<PxElement />
					</div>
					<div className={css.item}>
					颜色：
						<ColorPicker
							color={shadow.textShadowColor}
							onChange={(e) => {
								onChange({ textShadowColor: e.hex });
							}}
						/>
					</div>
					<div className={css.item}
						onMouseDown={() => {
							editor.removeMark("textShadow");
						}}
					>
						<button className={css.clear}>清除</button>
					</div>
				</div>
			)}
		>
			<ToolBtn title="字体阴影">
				<IconSvg name="icon-text-shadow" />
			</ToolBtn>
		</Popover>
	);
};

TextShadow.toRichStyle = ((cssStyle) => {
	const shadow = cssStyle.textShadow;
	if (!shadow) return cssStyle;
	return { ...cssStyle, ...toRichStyle(shadow) };
}) as ToRichStyle;

TextShadow.toCssStyle = ((richStyle) => {
	if (!richStyle.textShadowColor) return richStyle;
	return { ...richStyle, textShadow: toCssStyle(richStyle) };
}) as ToCssStyle;

export default TextShadow;