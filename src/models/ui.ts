import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface State {
    gridMode: boolean;
	graphic: echarts.GraphicComponentOption[];
}

// 判断是否为可以选中的组件名
export const ui = createModel<RootModel>()({
	state: {
		gridMode: false,
		graphic: [],
	} as State,

	reducers: {
		setGridMode(state: State, gridMode: boolean) {
			state.gridMode = gridMode;
		},

		setGraphic(state: State, graphic: State["graphic"]) {
			state.graphic = graphic;
		},
	},
});