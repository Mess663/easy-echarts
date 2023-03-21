
import { createModel } from "@rematch/core";
import { RootModel } from ".";
import { Title } from "../types/biz/option_form";

export interface State {
	titleSelectedKey: Title["_key"] | null
}

export const ui = createModel<RootModel>()({
	state: {
		titleSelectedKey: null,
	} as State,

	reducers: {
		titleSelectedKey: (state, payload: State["titleSelectedKey"]) => {
			state.titleSelectedKey = payload;
		},
	},
    
	effects: (dispatch) => ({
		/** 选中Title */
		selectTitle(index: number, state) {
			dispatch.ui.titleSelectedKey(state.optionForm.title[index]._key);
		}
	})
});