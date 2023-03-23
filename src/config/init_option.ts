import { uniqueId } from "lodash";
import { State as OptionFormState } from "../models/options";

// 这里定义ECharts option的初始化配置
const InitOption: Partial<Record<keyof OptionFormState, Record<string, unknown>>> = {
	title: {
		text: "标题",
	},
};

export const getInitOption = <T extends keyof OptionFormState>(name: T): OptionFormState[T][number] => {
	const _key = uniqueId();
	if (name in InitOption) return { ...InitOption[name], _key };
	return { _key };
};