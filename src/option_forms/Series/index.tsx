import React from "react";
import FormItem from "../../base/FormItem";
import ChartSelector from "../../components/ChartSelector";
import { Series } from "../../types/biz/option_form";
import { OptionFormProps } from "../type";
import css from "./index.module.less";

const SeriesForm  = ({ data, edit }: OptionFormProps<Series>) => {
	return (
		<div className={css.container}>
			<FormItem>
				<ChartSelector data={data} onChange={edit} />
			</FormItem>
		</div>
	);
};

export default SeriesForm;