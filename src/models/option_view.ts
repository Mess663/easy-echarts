
import { createModel } from "@rematch/core";
import { RootModel, RootState } from ".";

interface CommnState {
	selectedKey: string | null;
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
			selectedKey: null,
		},
		xAxis: {
			selectedKey: null,
		},
		yAxis: {
			selectedKey: null,
		},
		series: {
			selectedKey: null,
		}
	} as State,

	reducers: {
		selectKey: <N extends keyof State>(state: State, payload: { name: N, key: string }) => {
			if (payload.name in state) state[payload.name].selectedKey = payload.key;
		},
	},
    
	effects: (dispatch) => ({
		/** 选中该项 */
		select<N extends keyof State>(payload: { name: N, index: number }, state: RootState) {
			const { name, index } = payload;
			dispatch.optionView.selectKey({ name, key: state.options.title[index]._key });
		}
	})
});