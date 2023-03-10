import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { ChartEnumify } from "../types/biz/chart";
import { FormChart } from "../types/biz/option_form";

export interface State {
	charts: FormChart[];
	title: echarts.TitleComponentOption[]
}

export const optionForm = createModel<RootModel>()({
	state: {
		charts: [{ key: "1", name: ChartEnumify.Line.val, type: ChartEnumify.Line.code }],
		title: []
	} as State, // initial state
	reducers: {
		updateCharts(state, payload: FormChart[]) {
			state.charts = payload;
		},
		updateTitle(state, payload: echarts.TitleComponentOption[]) {
			state.title = payload;
		}
	},
});