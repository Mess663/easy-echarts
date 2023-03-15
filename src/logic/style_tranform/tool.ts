import { isNumber, isString } from "lodash";
import { CSSProperties } from "react";
import { EChartsStyleProperties } from "../../types/biz/option_form";

// const mapBackgroundColor = (backgroundColor: EChartsStyleProperties["backgroundColor"]) => {
// if (isString(backgroundColor)) {
// 	return {
// 		backgroundColor,
// 	};
// }
// FIXME: 无法正确显示图片
// if (isObject(backgroundColor) && isString(backgroundColor.image)) {
// 	return {
// 		backgroundSize: "contain",
// 		backgroundRepeat: "no-repeat",
// 		backgroundImage: "url(" + backgroundColor.image + ")",
// 	} as CSSProperties;
// }
// };


export const cssPaddingToRich = (padding: CSSProperties["padding"] | number[]) => {
	if (isString(padding)) {
		return padding.match(/[0-9]+/g)?.map(o => Number(o));
	}
	if (isNumber(padding)) {
		return padding;
	}
	return undefined;
};

export const richPaddingToCss = (padding: EChartsStyleProperties["padding"]) => {
	if (isNumber(padding)) return padding + "px";
	return padding?.map(o => o + "px").join(" ");
};