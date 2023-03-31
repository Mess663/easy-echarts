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

export function getInitOption<T extends keyof OptionFormState>(name: T, data: {
	gridId?: string;
	xAxisId?: string;
	yAxisId?: string;
}): OptionFormState[T][number] {
	const id = uniqueId();
	const ret = (() => {
		if (name === "grid") {
			return { id, gridId: id };
		}
		else if (data.gridId) {
			return { id, gridId: data.gridId, ...data };
		}
		else {
			throw new Error("[getInitOption]: gridId is required");
		}
	})();
	if (name in InitOption) return { ...InitOption[name], ...ret };
	return ret;
}