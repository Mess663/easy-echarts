import { createModel } from "@rematch/core";
import { isNumber, pick } from "lodash";
import { RootModel } from ".";
import { keys } from "../tools/type";
import { Grid, Series, Title, XAxis, YAxis } from "../types/biz/option";
import { getInitOption, mockAxis, mockSeries } from "../logic/init_option";

export interface State {
	series: Series[]
	title: Title[]
	xAxis: XAxis[]
	yAxis: YAxis[]
	grid: Grid[]
	// tooltip: Tooltip[]
}


const getDefaultOpton = (): State => {
	const grid = getInitOption("grid");
	const xAxis = getInitOption("xAxis", { gridId: grid.id });
	const yAxis = getInitOption("yAxis", { gridId: grid.id });
	const series = getInitOption("series", { gridId: grid.id, xAxisId: xAxis.id, yAxisId: yAxis.id });
	// const tooltip = getInitOption("tooltip", { gridId: grid.id });
	return {
		series: [{ ...series, data: mockSeries() }],
		title: [],
		xAxis: [{ ...xAxis, data: mockAxis() }],
		yAxis: [yAxis],
		grid: [grid],
		// tooltip: [tooltip]
	};
};

// 用于ts无法正确推导option的数组类型
type OptionArray<N extends keyof State> = Array<State[N][number]>;


export const options = createModel<RootModel>()({
	state: getDefaultOpton() as State,

	reducers: {
		add<N extends keyof State>(state: State, payload: { name: N, data: Partial<State[N][number]> }) {
			const newOption = (() => {
				if (payload.name === "series") {
					return { ...payload.data, data: mockSeries() };
				}
				else if (payload.name === "xAxis") {
					return { ...payload.data, data: mockAxis() };
				}
				else {
					return payload.data;
				}

			})();
			(state[payload.name] as OptionArray<N>).push(newOption as State[N][number]);
		},

		remove<N extends keyof State>(state: State, payload: { name: N, id: string }) {
			state[payload.name] = (
					state[payload.name] as OptionArray<N>
				).filter(item => item.id !== payload.id) as State[N];
		},

		// 编辑option数组中单项配置
		modify<N extends keyof State>(state: State, payload: { name: N, data: State[N][number] }) {
			const { id, ...rest } = payload.data;
			const index = state[payload.name].findIndex(item => item.id === id);
			if (isNumber(index)) {
				state[payload.name][index] = { ...state[payload.name][index], ...rest };
			}
		},

		// 按索引编辑option数组中单项配置
		modifyByIndex<N extends keyof State>(state: State, payload: { name: N, index: number, data: Partial<State[N][number]> }) {
			const { name, index, data } = payload;
			state[name][index] = { ...state[name][index], ...data };
		},

		// 更新整个option数组
		update<N extends keyof State>(state: State, payload: {name: N, data: State[N]}) {
			state[payload.name] = payload.data;
		},

		// grid是比较特殊的组件，需要单独增删处理
		addGrid(state: State) {
			const newOption = getDefaultOpton();
			newOption.grid = newOption.grid.map(o => {
				return {
					...o,
					left: "50%",
					top: "25%",
					bottom: "25%"
				};
			});
			const propKeys = keys(newOption);
			propKeys.forEach(<N extends keyof State>(k: N) => {
				const source: OptionArray<N> = newOption[k];
				const target: OptionArray<N> = state[k];
				if (Array.isArray(source) && Array.isArray(target)) {
					target.push(...source);
				}
			});
		},

		/**
		 * 当修改grid的位置和宽高时，需要特别处理一下饼图
		 */
		modifyGridRect(state: State, payload: Grid) {
			const { id, ...rest } = payload;
			const index = state.grid.findIndex(item => item.id === id);
			if (isNumber(index)) {
				state.grid[index] = { ...state.grid[index], ...rest };
				state.series = state.series.map(item => {
					if (item.type === "pie") {
						return {
							...item,
							...pick(payload, ["left", "top", "right", "bottom"])
						};
					}

					return item;
				});
			}
		},

		removeGrid(state: State, id: string) {
			const propKeys = keys(state);
			propKeys.forEach(<N extends keyof State>(k: N) => {
				state[k] = (state[k] as OptionArray<N>).filter(item => item.gridId !== id) as State[N];
			});
		},
	},
});