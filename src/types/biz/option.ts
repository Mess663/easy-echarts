import { Chart } from "./chart";

// 辅助属性，仅用于业务逻辑，不属于ECharts的配置项
interface OptionForm {
    id: string; // 用于辨别多个option
    gridId: string // 组件属于哪个grid
}

type WrapCommonOption<T extends { id?: string | number }> = T & OptionForm;

/** ECharts富文本属性 */
export type EchartsRich = NonNullable<NonNullable<echarts.TitleComponentOption["textStyle"]>["rich"]>;

/** ECharts自己的通用样式 */
export type RichStyle = EchartsRich[keyof EchartsRich]

/**
 * 通用全局配置
 */
export interface CommonOption {
	color?: echarts.Color[]
    legend: echarts.LegendComponentOption
	tooltip: Tooltip
    radar: echarts.RadarComponentOption | undefined
}

// 图表选择对象（转换成series）
export type Series = {
    type: Chart // series type
    name?: string  // 系列名称
    xAxisIndex?: number
    yAxisIndex?: number
    xAxisId?: string
    yAxisId?: string
} & OptionForm & echarts.SeriesOption;

export type Title = WrapCommonOption<echarts.TitleComponentOption>

export type XAxis = WrapCommonOption<echarts.XAXisComponentOption> & { data: (string|number)[] }

export type YAxis = WrapCommonOption<echarts.YAXisComponentOption>

export type Grid = WrapCommonOption<echarts.GridComponentOption>;

export type Graphic = WrapCommonOption<echarts.GraphicComponentOption>;

export type Tooltip = echarts.TooltipComponentOption;

export interface ComponentOption {
    series: Series[]
	title: Title[]
	xAxis: XAxis[]
	yAxis: YAxis[]
	grid: Grid[]
}