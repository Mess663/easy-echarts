import { Models } from "@rematch/core";
import { optionForm } from "./option_form";
import immerPlugin from "@rematch/immer";
import { init, RematchDispatch, RematchRootState } from "@rematch/core";

export interface RootModel extends Models<RootModel> {
  optionForm: typeof optionForm;
}

const models: RootModel = { optionForm };

export const store = init<RootModel>({
	models,
	plugins: [immerPlugin()],
});

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>