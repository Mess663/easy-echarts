import { EnumifyInfer, enumify } from "../tools/enumify";
import barSvg from "../../static/imgs/bar.svg";
import lineSvg from "../../static/imgs/line.svg";
import pieSvg from "../../static/imgs/pie.svg";

/**
 * 图表类型
 * @enum {string} ChartEnumify.isObjectData - 数据data参数是否为对象数组{value, name}
 * */
export const ChartEnumify = enumify({
	Line: { code: "line", val: { name: "折线图", isObjectData: false, icon: lineSvg } },
	Bar: { code: "bar", val: { name: "柱状图", isObjectData: false, icon: barSvg } },
	Pie: { code: "pie", val: { name: "饼图", isObjectData: true, icon: pieSvg } },
	// Radar: { code: "radar", val: { name: "雷达图", isObjectData: true, icon: pieSvg } },
	Funnel: { code: "funnel", val: { name: "漏斗图", isObjectData: true, icon: pieSvg } },
} as const);

/** @see {@link ChartEnumify} */
export type Chart = EnumifyInfer<typeof ChartEnumify>;
