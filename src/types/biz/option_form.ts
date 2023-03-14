import { Chart } from "./chart";

// 图表选择对象（转换成series）
export type FormChart = {
    _key: string,  // 唯一id
    name: string  // 图表中文名
    type: Chart // series type
}

/** ECharts富文本属性 */
export type RichStyle = NonNullable<NonNullable<echarts.TitleComponentOption["textStyle"]>["rich"]>;

/** ECharts自己的通用样式 */
export type EChartsStyleProperties = RichStyle[keyof RichStyle];

export interface Title extends echarts.TitleComponentOption {
    _key: string; // 用于辨别多个title
}