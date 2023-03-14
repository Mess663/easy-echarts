import { CSSProperties } from "react";
import { EChartsStyleProperties, RichStyle } from "../types/biz/option_form";

// 换行符
export const LineBreaker = "\n";

/**
 * 富文本样式映射的状态 @see{@link DiffStylePropMap}
 */
export enum StyleStatus {
    unsupported,
    specific, // 无法直接转换成CSS样式，需要特殊处理
}

// 将ECharts的富文本样式属性名映射成Slate的样式属性名(只收录属性名有差异的部分)
export const DiffStylePropMap: Partial<Record<keyof EChartsStyleProperties, keyof CSSProperties | StyleStatus>> = {
	align: "textAlign",
	borderDashOffset: StyleStatus.unsupported,
	shadowColor: StyleStatus.specific,
	shadowBlur: StyleStatus.specific,
	shadowOffsetX: StyleStatus.specific,
	shadowOffsetY: StyleStatus.specific,
	textBorderColor: StyleStatus.specific,
	textBorderDashOffset: StyleStatus.specific,
	textBorderType: StyleStatus.specific,
	textBorderWidth: StyleStatus.specific,
	textShadowBlur: StyleStatus.specific,
	textShadowColor: StyleStatus.specific,
	textShadowOffsetX: StyleStatus.specific,
	textShadowOffsetY: StyleStatus.specific,
	width: StyleStatus.unsupported, // 在rich外设置
	height: StyleStatus.unsupported, // 在rich外设置
};
