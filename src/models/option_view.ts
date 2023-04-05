
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
	graphic: CommnState
}
const getInitState = () => (
	{
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
		},
		graphic: {
			selectedId: null,
		}
	} as State
);

export const optionView = createModel<RootModel>()({
	state: getInitState(),

	reducers: {
		selectId: <N extends keyof State>(state: State, payload: { name: N, id: string }) => {
			if (payload.name in state) {
				state[payload.name].selectedId = payload.id;
			}
		},

		// 切换图表时需要充值所有选中项
		reset() {
			return getInitState();
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