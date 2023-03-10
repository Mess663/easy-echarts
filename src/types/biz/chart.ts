import { EnumifyInfer, enumify } from "../tools/enumify";

/** 图表类型 */
export const ChartEnumify = enumify({
	Line: { code: "line", val: "折线图" },
	Bar: { code: "bar", val: "柱状图" },
	Pie: { code: "pie", val: "饼图" },
} as const);

/** @see {@link ChartEnumify} */
export type Chart = EnumifyInfer<typeof ChartEnumify>;
