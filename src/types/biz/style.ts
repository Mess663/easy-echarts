import { XAxis } from "./option";

/**
 * eCharts内的阴影属性
 */
export type Shadow = {
    shadowColor: string;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
}

/**
 * eCharts内的线条样式
 */
export type LineStyle = NonNullable<NonNullable<XAxis["axisLine"]>["lineStyle"]> | NonNullable<NonNullable<XAxis["splitLine"]>["lineStyle"]>

/**
 * eCharts内的分隔区样式
 */
export type AreaStyle = NonNullable<NonNullable<XAxis["splitArea"]>["areaStyle"]>