import { uniqueId } from "lodash";
import { State as OptionFormState } from "../models/options";
import { ChartEnumify } from "../types/biz/chart";
import { getUniqueNum } from "../tools/number";
import { Random, mock } from "mockjs";

// 这里定义ECharts option的初始化配置
const genOption = () => {
	const option: Partial<Record<keyof OptionFormState, Record<string, unknown>>> = {
		title: {
			text: "标题",
		},
		xAxis: {
			type: "category",
		},
		series: {
			type: ChartEnumify.Line.code
		},
		grid: {
			z: getUniqueNum(),
		},
		// tooltip: {}
	};
	return option;
};

export function getInitOption(name: "series", data: { gridId: string, xAxisId: string, yAxisId: string }): OptionFormState["series"][number];
export function getInitOption<T extends keyof Omit<OptionFormState, "series">>(name: T, data: { gridId: string}): OptionFormState[T][number];
export function getInitOption(name: "grid"): OptionFormState["grid"][number];
export function getInitOption<T extends keyof OptionFormState>(name: T, data?: {
	gridId?: string;
	xAxisId?: string;
	yAxisId?: string;
}): OptionFormState[T][number] {
	const id = uniqueId();
	const ret = (() => {
		if (name === "grid") {
			return { id, gridId: id };
		}
		else if (data?.gridId) {
			return { id, gridId: data.gridId, ...data };
		}
		else {
			throw new Error("[getInitOption]: gridId is required");
		}
	})();
	const option = genOption();
	if (name in option) return { ...option[name], ...ret };
	return ret;
}

export const mockAxis = () => mock({
	["value|10"]: [() => Random.cname()]
}).value;
export const mockSeries = () => mock({
	["value|10"]: ["@natural(20, 90)"]
}).value;
export const mockPieSeries = () => mock({
	["value|10"]: [{
		value: "@natural(20, 90)",
		name: () => Random.cname()
	}]
}).value;