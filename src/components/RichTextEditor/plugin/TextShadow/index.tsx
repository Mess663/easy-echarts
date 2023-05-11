import { last } from "lodash";
import IconSvg from "../../../../base/IconSvg";
import { isColorString } from "../../../../tools/color";
import ToolBtn from "../../components/ToolBtn";
import { PluginProps, ToCssStyle, ToolPlugin, ToRichStyle } from "../type";
import ShadowPicker from "../../../../base/ShadowPicker";

type ShadowRichStyle = ReturnType<typeof toRichStyle>

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

	return (
		<ShadowPicker
			shadow={{
				shadowOffsetX: shadow.textShadowOffsetX,
				shadowOffsetY: shadow.textShadowOffsetY,
				shadowBlur: shadow.textShadowBlur,
				shadowColor: shadow.textShadowColor
			}}
			onChange={(newShadow) => {
				if (newShadow) {
					onChange({
						textShadowOffsetX: newShadow.shadowOffsetX,
						textShadowOffsetY: newShadow.shadowOffsetY,
						textShadowBlur: newShadow.shadowBlur,
						textShadowColor: newShadow.shadowColor
					});
				}
				else {
					editor.removeMark("textShadow");
				}
			}}
		>
			<ToolBtn title="字体阴影">
				<IconSvg name="icon-text-shadow" />
			</ToolBtn>
		</ShadowPicker>
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