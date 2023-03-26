import { uniqueId } from "lodash";
import { State as OptionFormState } from "../models/options";
import { ChartEnumify } from "../types/biz/chart";

// 这里定义ECharts option的初始化配置
const InitOption: Partial<Record<keyof OptionFormState, Record<string, unknown>>> = {
	title: {
		text: "标题",
	},
	xAxis: {
		type: "category",
	},
	series: {
		type: ChartEnumify.Line.code
	}
};

export const getInitOption = <T extends keyof OptionFormState>(name: T): OptionFormState[T][number] => {
	const id = uniqueId();
	if (name in InitOption) return { ...InitOption[name], id };
	return { id };
};