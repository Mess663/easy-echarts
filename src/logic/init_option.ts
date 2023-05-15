import { uniqueId } from "lodash";
import { Chart, ChartEnumify } from "../types/biz/chart";
import { getUniqueNum } from "../tools/number";
import { Random, mock } from "mockjs";
import { ComponentOption } from "../types/biz/option";

// 这里定义ECharts option的初始化配置
const genOption = () => {
	const option: Partial<Record<keyof ComponentOption, Record<string, unknown>>> = {
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

export function getInitOption(name: "series", data: { gridId: string, xAxisId: string, yAxisId: string }): ComponentOption["series"][number];
export function getInitOption<T extends keyof Omit<ComponentOption, "series">>(name: T, data: { gridId: string}): ComponentOption[T][number];
export function getInitOption(name: "grid"): ComponentOption["grid"][number];
export function getInitOption<T extends keyof ComponentOption>(name: T, data?: {
	gridId?: string;
	xAxisId?: string;
	yAxisId?: string;
}): ComponentOption[T][number] {
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

export const mockAxis = (count = 4) => mock({
	["value|" + count ]: [() => Random.cname()]
}).value;
const mockObjectSeriesData = (count = 4) => mock({
	["value|" + count]: [{
		value: "@natural(20, 90)",
		name: () => Random.cname()
	}]
}).value;
export const mockSeries = (count = 4, type: Chart = ChartEnumify.Line.code) => {
	return 	ChartEnumify.$getEnumVal(type).isObjectData
		? mockObjectSeriesData()
		: mock({
			["value|" + count]: ["@natural(20, 90)"]
		}).value;
};