import React from "react";
import FormItem from "../../base/FormItem";
import { Grid } from "../../types/biz/option_form";
import { OptionFormProps } from "../type";
import css from "./index.module.less";

const GridForm  = ({ remove, data }: OptionFormProps<Grid>) => {
	return (
		<div className={css.container}>
			<FormItem>
				123
			</FormItem>
		</div>
	);
};


export default GridForm;