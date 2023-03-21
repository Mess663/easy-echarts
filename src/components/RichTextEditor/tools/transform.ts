import { isNumber, isString, isEmpty, uniqueId, reduce  } from "lodash";
import { CSSProperties } from "react";
import { LineBreaker } from "../../../config/options";
import { RichStyle, EchartsRich } from "../../../types/biz/option_form";
import { pluginList } from "../plugin";
import { CustomElement } from "../type";

export const cssPaddingToRich = (padding: CSSProperties["padding"] | number[]) => {
	if (isString(padding)) {
		return padding.match(/[0-9]+/g)?.map(o => Number(o));
	}
	if (isNumber(padding)) {
		return padding;
	}
	return undefined;
};

export const richPaddingToCss = (padding: RichStyle["padding"]) => {
	if (isNumber(padding)) return padding + "px";
	return padding?.map(o => o + "px").join(" ");
};

/**
 * 将富文本中的字符和样式id解析出来
 * @param rich ECharts的富文本
 * @returns
 */
export const parseRich = (rich: string) => {
	const pattern = /({(\w+)\|([^{}]+)}|([^{}]+))/g;
	const result = [];

	let match;
	while ((match = pattern.exec(rich)) !== null) {
		if (match[2] && match[3]) {
			result.push({
				styleKey: match[2],
				text: match[3]
			});
		}
		else {
			result.push({
				text: match[1]
			});
		}
	}

	return result;
};

/**
 * 将ECharts的富文本样式映射成Slate的样式
 * @param richStyle
 * @returns
 */
export const mapRichStyleToCss = (richStyle: RichStyle): CSSProperties => {
	const {
		borderRadius, align, padding,
	} = richStyle;

	const newRichStyle = reduce(pluginList, (acc, plugin) => plugin.toCssStyle ? plugin.toCssStyle(acc) : acc, richStyle);

	return {
		...newRichStyle,
		textAlign: align,
		borderRadius: isNumber(borderRadius) ? borderRadius + "px" : borderRadius?.map(o => o + "px").join(" "),
		padding: richPaddingToCss(padding),
	} as CSSProperties;
};

export const mapCssToRichStyle = (cssStyle: CSSProperties) => {
	const { textAlign, padding } = cssStyle;
	
	const newCssStyle = pluginList.reduce((acc, plugin) => plugin.toRichStyle ? plugin.toRichStyle(acc) : acc, cssStyle);

	return {
		...newCssStyle,
		align: textAlign,
		padding: cssPaddingToRich(padding),
	};
};

/**
 * 将Slate Schema转换为ECharts的富文本格式
 * @param elemetns Slate Schema
 * @returns {text: string, style: RichStyle}
 */
export const transformToRich = (elemetns: CustomElement[]): {text: string, style: EchartsRich} => {
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
							[child.id]: mapCssToRichStyle(child),
						};
					}
					return acc;
				}, {}),
			};
			return [newText, newStyle];
		}
		return acc;
	}, [[] as string[], {} as EchartsRich]);

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
export const transformToSchema = (richText: string, richStyle: EchartsRich): CustomElement[] => {
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