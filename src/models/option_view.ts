
import { createModel } from "@rematch/core";
import { RootModel, RootState } from ".";

interface CommnState {
	selectedId: string | null;
}
export interface State {
	title: CommnState
	xAxis: CommnState
	yAxis: CommnState
	series: CommnState
	grid: CommnState
}

export const optionView = createModel<RootModel>()({
	state: {
		title: {
			selectedId: null,
		},
		xAxis: {
			selectedId: null,
		},
		yAxis: {
			selectedId: null,
		},
		series: {
			selectedId: null,
		},
		grid: {
			selectedId: null,
		}
	} as State,

	reducers: {
		selectKey: <N extends keyof State>(state: State, payload: { name: N, key: string }) => {
			if (payload.name in state) state[payload.name].selectedId = payload.key;
		},
	},
    
	effects: (dispatch) => ({
		/** 选中该项 */
		select<N extends keyof State>(payload: { name: N, index: number }, state: RootState) {
			const { name, index } = payload;
			dispatch.optionView.selectKey({ name, key: state.options[name][index].id });
		}
	})
});