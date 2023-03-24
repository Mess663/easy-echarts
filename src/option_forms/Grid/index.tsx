import React from "react";
import FormItem from "../../base/FormItem";
import OptionsBar from "../../components/OptionsBar";
import { Grid } from "../../types/biz/option_form";
import { OptionFormProps } from "../type";
import css from "./index.module.less";

const GridForm  = ({ indexObj, remove, data, edit }: OptionFormProps<Grid>) => {
	const onRemove = () => remove(data._key);
	return (
		<div className={css.container}>
			<OptionsBar
				remove={indexObj.length > 1 ? onRemove  : undefined}
				tips={`预览区点击标题可编辑：${indexObj.index}/${indexObj.length}`}
			/>

			<FormItem>
				123
			</FormItem>
		</div>
	);
};


export default GridForm;