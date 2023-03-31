import { CSSProperties } from "react";
import { RichStyle } from "../../types/biz/option";

/**
 * 富文本样式映射的状态 @see{@link DiffStylePropMap}
 */
export enum StylePropMapStatus {
    unsupported,
    specific, // 无法直接转换成CSS样式，需要特殊处理
}

// 将ECharts的富文本样式属性名映射成Slate的样式属性名(只收录属性名有差异的部分)
export const DiffStylePropMap: Partial<Record<
	keyof RichStyle, keyof CSSProperties | StylePropMapStatus
>> = {
	align: "textAlign",
	borderDashOffset: StylePropMapStatus.unsupported,
	shadowColor: StylePropMapStatus.specific,
	shadowBlur: StylePropMapStatus.specific,
	shadowOffsetX: StylePropMapStatus.specific,
	shadowOffsetY: StylePropMapStatus.specific,
	// 需要将数组转成字符串
	borderRadius: StylePropMapStatus.specific,

	/** 字体描边和字体阴影在css中统一都用字体阴影实现 */
	textBorderColor: StylePropMapStatus.specific,
	textBorderDashOffset: StylePropMapStatus.specific,
	textBorderType: StylePropMapStatus.specific,
	textBorderWidth: StylePropMapStatus.specific,
	textShadowBlur: StylePropMapStatus.specific,
	textShadowColor: StylePropMapStatus.specific,
	textShadowOffsetX: StylePropMapStatus.specific,
	textShadowOffsetY: StylePropMapStatus.specific,

	/** 在rich外设置 */
	width: StylePropMapStatus.unsupported,
	height: StylePropMapStatus.unsupported,
};