import React from "react";
import FormItem from "../../base/FormItem";
import ChartSelector from "../../components/ChartSelector";
import OptionsBar from "../../components/OptionsBar";
import { Series } from "../../types/biz/option_form";
import { OptionFormProps } from "../type";
import css from "./index.module.less";

const SeriesForm  = ({ indexObj, remove, data, edit }: OptionFormProps<Series>) => {
	const onRemove = () => remove(data._key);
	return (
		<div className={css.container}>
			<OptionsBar
				remove={indexObj.length > 1 ? onRemove  : undefined}
				tips={`预览区点击标题可编辑：${indexObj.index}/${indexObj.length}`}
			/>

			<FormItem>
				<ChartSelector data={data} onChange={edit} />
			</FormItem>
		</div>
	);
};

export default SeriesForm;