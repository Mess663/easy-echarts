import { Chart } from "./chart";

// 辅助属性，仅用于业务逻辑，不属于ECharts的配置项
interface OptionForm {
    _key: string; // 用于辨别多个option
}

// 图表选择对象（转换成series）
export type Series = {
    name: string  // 图表中文名
    type: Chart // series type
} & OptionForm;

/** ECharts富文本属性 */
export type EchartsRich = NonNullable<NonNullable<echarts.TitleComponentOption["textStyle"]>["rich"]>;

/** ECharts自己的通用样式 */
export type RichStyle = EchartsRich[keyof EchartsRich];

export interface Title extends echarts.TitleComponentOption, OptionForm {}

export type XAxis = echarts.XAXisComponentOption & OptionForm;

export type YAxis = echarts.YAXisComponentOption & OptionForm;

export type Grid = echarts.GridComponentOption & OptionForm;