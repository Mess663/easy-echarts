import { isEmpty, uniqueId } from "lodash";
import { CustomElement } from "../components/RichTextEditor/type";
import { LineBreaker } from "../config/options";
import { RichStyle } from "../types/biz/option_form";

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
					if (child.style) {
						return {
							...acc,
							[child.id]: child.style,
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
 * 将富文本中的字符和样式id解析出来
 * @param rich ECharts的富文本
 * @returns
 */
function parseRich(rich: string) {
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
}

/**
 * 将ECharts的富文本格式转换为Slate Schema
 * @param richText ECharts的富文本
 * @param richStyleMap 样式表
 */
export const transformRichToSchema = (richText: string, richStyleMap: RichStyle): CustomElement[] => {
	return richText
		.split(LineBreaker)
		.map(t => parseRich(t))
		.map(r => {
			return {
				type: "paragraph",
				children: r.map(c => {
					return {
						text: c.text,
						style: c.styleKey ? richStyleMap?.[c.styleKey] : undefined
					};
				})
			};
		});
};
