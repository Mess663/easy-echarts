import { atom } from "recoil";
import { FormChart } from "../types/biz/option_form";

const optionForm = {
	/** @see {@link FormChart} */
	chartsState: atom<FormChart[]>({
		key: "chartsState",
		default: []
	})
};

export default optionForm; 