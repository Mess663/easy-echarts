/**
 * 线条类型
 * @enum {string}
 * @see https://echarts.apache.org/zh/option.html#yAxis.axisLine.lineStyle.type
 */
export enum LineType {
    Solid = "solid",
    Dashed = "dashed",
    Dotted = "dotted",
}

/**
 * 指定线段末端的绘制方式
 * @enum {string}
 * @see https://echarts.apache.org/zh/option.html#yAxis.axisLine.lineStyle.cap
 */
export enum LineCap {
    Butt = "butt",
    Round = "round",
    Square = "square",
}