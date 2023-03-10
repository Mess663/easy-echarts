import { createModel } from "@rematch/core";
import { uniqueId } from "lodash";
import { RootModel } from ".";
import { ChartEnumify } from "../types/biz/chart";
import { FormChart, Title } from "../types/biz/option_form";

export interface State {
	charts: FormChart[];
	title: Title[]
}

export const optionForm = createModel<RootModel>()({
	state: {
		charts: [{ key: "1", name: ChartEnumify.Line.val, type: ChartEnumify.Line.code }],
		title: []
	} as State, 

	reducers: {
		updateCharts(state, payload: State["charts"]) {
			state.charts = payload;
		},

		addTitle(state, payload: Omit<Title, "_key">) {
			state.title.push({ _key: uniqueId(), ...payload });
		},

		/** 删除单独的Title */
		removeTitle(state, payload: Title["_key"]) {
			state.title = state.title.filter(item => item._key !== payload);
		},

		/** 修改单独的Title */
		modifyTitle(state, payload: Title) {
			const { _key, ...rest } = payload;
			const index = state.title.findIndex(item => item._key === _key);
			state.title[index] = { ...state.title[index], ...rest };
		},
	},
});