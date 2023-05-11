import { createModel } from "@rematch/core";
import { RootModel } from ".";

export interface State {
    gridMode: boolean;
	graphic: echarts.GraphicComponentOption[];
	dataCount: number; // 数据量
}

// 判断是否为可以选中的组件名
export const ui = createModel<RootModel>()({
	state: {
		gridMode: false,
		graphic: [],
		dataCount: 4
	} as State,

	reducers: {
		setGridMode(state: State, gridMode: boolean) {
			state.gridMode = gridMode;
		},

		setGraphic(state: State, graphic: State["graphic"]) {
			state.graphic = graphic;
		},

		setDataCount(state: State, dataCount: number) {
			state.dataCount = dataCount;
		}
	},
});