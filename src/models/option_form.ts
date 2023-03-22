import { createModel } from "@rematch/core";
import { isNumber, uniqueId } from "lodash";
import { RootModel } from ".";
import { ChartEnumify } from "../types/biz/chart";
import { Series, Title, XAxis, YAxis } from "../types/biz/option_form";

export interface State {
	series: Series[]
	title: Title[]
	xAxis: XAxis[]
	yAxis: YAxis[]
}

const defaultTitleKey = uniqueId();

export const optionForm = createModel<RootModel>()({
	state: {
		series: [{ _key: uniqueId(), name: ChartEnumify.Line.val, type: ChartEnumify.Line.code }],
		title: [{ _key: defaultTitleKey, text: "标题" }],
		xAxis: [{ type: "category" }],
		yAxis: [{}]
	} as State,

	reducers: {
		/** ==== common ==== */

		add<N extends keyof State>(state: State, payload: { name: N, data: Partial<State[N][number]> }) {
			payload.data._key = uniqueId();
			(state[payload.name] as Array<State[N][number]>).push({ ...payload.data, _key: uniqueId() });
		},

		remove<N extends keyof State>(state: State, payload: { name: N, _key: string }) {
			state[payload.name] = (
					state[payload.name] as Array<State[N][number]>
				).filter(item => item._key !== payload._key) as State[N];
		},

		modify<N extends keyof State>(state: State, payload: { name: N, data: State[N][number] }) {
			const { _key, ...rest } = payload.data;
			const index = state[payload.name].findIndex(item => item._key === _key);
			if (isNumber(index)) {
				state[payload.name][index] = { ...state.title[index], ...rest };
			}
		},

		modifyByIndex<N extends keyof State>(state: State, payload: { name: N, index: number, data: Partial<State[N][number]> }) {
			const { name, index, data } = payload;
			state[name][index] = { ...state[name][index], ...data };
		},

		/** ================ */

		/** ==== series ==== */

		updateCharts(state, payload: State["series"]) {
			state.series = payload;
		},

		/** ================ */
	},
});