import { EnumifyInfer, enumify } from "../tools/enumify";
import barSvg from "../../static/imgs/bar.svg";
import lineSvg from "../../static/imgs/line.svg";
import pieSvg from "../../static/imgs/pie.svg";

/** 图表类型 */
export const ChartEnumify = enumify({
	Line: { code: "line", val: { name: "折线图", icon: lineSvg } },
	Bar: { code: "bar", val: { name: "柱状图", icon: barSvg } },
	Pie: { code: "pie", val: { name: "饼图", icon: pieSvg } },
} as const);

/** @see {@link ChartEnumify} */
export type Chart = EnumifyInfer<typeof ChartEnumify>;
