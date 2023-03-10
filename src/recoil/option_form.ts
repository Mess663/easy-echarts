import { atom } from "recoil";
import { FormChart } from "../types/biz/option_form";
import * as echarts from "echarts";

const optionForm = {
	/**
	 * 	图表选择
	 *  @see {@link FormChart} 
	 * */
	charts: atom<FormChart[]>({
		key: "optionForm_charts",
		default: []
	}),

	/** 
	 * 标题组件，包含主标题和副标题。 
	 * @url https://echarts.apache.org/zh/option.html#title
	 * */
	title: atom<echarts.TitleComponentOption[]>({
		key: "optionForm_title",
		default: []
	})
};

export default optionForm; 