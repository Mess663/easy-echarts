import { isEmpty, isNumber, uniqueId } from "lodash";
import { CSSProperties } from "react";
import { CustomElement } from "../../components/RichTextEditor/type";
import { LineBreaker } from "../../config/options";
import { EChartsStyleProperties, RichStyle } from "../../types/biz/option_form";
import { cssPaddingToRich, parseRich, richPaddingToCss } from "./tool";


/**
 * 将ECharts的富文本样式映射成Slate的样式
 * @param richStyle
 * @returns
 */
export const mapRichStyleToCss = (richStyle: EChartsStyleProperties): CSSProperties => {
	const {
		borderRadius, align, padding,
		textShadowBlur = 0, textShadowOffsetX = 0, textShadowOffsetY = 0, textShadowColor = "transparent"
	} = richStyle;

	return {
		...richStyle,
		textAlign: align,
		textShadow: `${textShadowOffsetX}px ${textShadowOffsetY}px ${textShadowBlur}px ${textShadowColor}`,
		borderRadius: isNumber(borderRadius) ? borderRadius + "px" : borderRadius?.map(o => o + "px").join(" "),
		padding: richPaddingToCss(padding),
	} as CSSProperties;
};

export const mapCssToRichStyle = (slateStyle: CSSProperties) => {
	const { textAlign, padding } = slateStyle;
	return {
		...slateStyle,
		align: textAlign,
		padding: cssPaddingToRich(padding),
	};
};

/**
 * 将Slate Schema转换为ECharts的富文本格式
 * @param elemetns Slate Schema
 * @returns {text: string, style: RichStyle}
 */
export const transformSchemaToRich = (elemetns: CustomElement[]): {text: string, style: RichStyle} => {
	const [richText, richStyleMap] = elemetns.reduce((acc, element) => {
		const [text, style] = acc;
		if (!isEmpty(element.children)) {
			const newChildren = element.children.map(child => {
				const id = uniqueId();
				return {
					...child,
					text: child.text ? `{${id}|${child.text}}` : "",
					id,
				};
			});
			const newText = [...text, newChildren.map(child => child.text).join("")];
			const newStyle = {
				...style,
				...newChildren.reduce((acc, child) => {
					if (child) {
						return {
							...acc,
							[child.id]: child,
						};
					}
					return acc;
				}, {}),
			};
			return [newText, newStyle];
		}
		return acc;
	}, [[] as string[], {} as RichStyle]);
	return {
		text: richText.join(LineBreaker),
		style: richStyleMap,
	};
};

/**
 * 将ECharts的富文本格式转换为Slate Schema
 * @param richText ECharts的富文本
 * @param richStyle 样式表
 */
export const transformRichToSchema = (richText: string, richStyle: RichStyle): CustomElement[] => {
	return richText
		.split(LineBreaker)
		.map(t => parseRich(t))
		.map(r => {
			return {
				type: "paragraph",
				children: r.map(c => {
					const o = { text: c.text };
					if (c.styleKey) {
						return {
							...o,
							...mapRichStyleToCss(richStyle?.[c.styleKey]),
						};
					}
					return o;
				})
			};
		});
};