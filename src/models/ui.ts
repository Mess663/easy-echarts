import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface State {
    gridMode: boolean;
}

// 判断是否为可以选中的组件名
export const ui = createModel<RootModel>()({
	state: {
		gridMode: false,
	} as State,

	reducers: {
		setGridMode(state: State, gridMode: boolean) {
			state.gridMode = gridMode;
		}
	},
});