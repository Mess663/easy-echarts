
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

const initState = {
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
};

export const optionView = createModel<RootModel>()({
	state: { ...initState  } as State,

	reducers: {
		selectId: <N extends keyof State>(state: State, payload: { name: N, id: string }) => {
			if (payload.name in state) {
				state[payload.name].selectedId = payload.id;
			}
		},

		reset() {
			return { ...initState };
		}
	},
    
	effects: (dispatch) => ({
		/** 选中该项 */
		select<N extends keyof State>(payload: { name: N, index: number }, state: RootState) {
			const { name, index } = payload;
			dispatch.optionView.selectId({ name, id: state.options[name][index].id });
		},

		selectGrid(id: string, state) {
			if (id === state.optionView.grid.selectedId) return;
			dispatch.optionView.reset();
			dispatch.optionView.selectId({ name: "grid", id });
		}
	})
});