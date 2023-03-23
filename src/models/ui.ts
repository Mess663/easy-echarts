
import { createModel } from "@rematch/core";
import { RootModel, RootState } from ".";

interface CommnState {
	selectedKey: string | null;
}
export interface State {
	title: CommnState,
	xAxis: CommnState
}

export const ui = createModel<RootModel>()({
	state: {
		title: {
			selectedKey: null,
		},
		xAxis: {
			selectedKey: null,
		}
	} as State,

	reducers: {
		selectKey: <N extends keyof State>(state: State, payload: { name: N, key: string }) => {
			state[payload.name].selectedKey = payload.key;
		},
	},
    
	effects: (dispatch) => ({
		/** 选中该项 */
		select<N extends keyof State>(payload: { name: N, index: number }, state: RootState) {
			const { name, index } = payload;
			dispatch.ui.selectKey({ name, key: state.optionForm.title[index]._key });
		}
	})
});