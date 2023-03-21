import { Models } from "@rematch/core";
import { optionForm } from "./option_form";
import immerPlugin from "@rematch/immer";
import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { ui } from "./ui";

export interface RootModel extends Models<RootModel> {
  optionForm: typeof optionForm;
  ui: typeof ui;
}

const models: RootModel = { optionForm, ui };



export const store = init<RootModel>({
	models,
	plugins: [immerPlugin()],
});

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>