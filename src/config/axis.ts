import { EnumifyInfer, enumify } from "../types/tools/enumify";

/**
 * 坐标轴位置
 * @see https://echarts.apache.org/zh/option.html#xAxis.position
 */
export enum AxisPosition {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right",
}

/**
 * 坐标轴名称位置
 * @see https://echarts.apache.org/zh/option.html#xAxis.nameLocation
 */
export enum AxisNameLocation {
    start = "start",
    middle = "middle",
    end = "end",
}

/**
 * 坐标轴类型
 * @enum {string}
 * @see https://echarts.apache.org/zh/option.html#xAxis.type
 */
export const AxisTypeEnum = enumify({
	Value: { code: "value", val: "数值轴" },
	Category: { code: "category", val: "类目轴" },
	Time: { code: "time", val: "时间轴" },
	Log: { code: "log", val: "对数轴" },
} as const);

/**
 * @see {@link AxisTypeEnum}
 */
export type AxisType = EnumifyInfer<typeof AxisTypeEnum>;
