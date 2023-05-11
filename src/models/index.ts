import { Models } from "@rematch/core";
import { options } from "./options";
import immerPlugin from "@rematch/immer";
import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { optionView } from "./option_view";
import { ui } from "./ui";

export interface RootModel extends Models<RootModel> {
  options: typeof options;
  optionView: typeof optionView;
  ui: typeof ui;
}

const models: RootModel = { options, optionView, ui };

export const store = init<RootModel>({
	models,
	plugins: [immerPlugin()],
});

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>