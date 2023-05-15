import React from "react";
import FormItem from "../../base/FormItem";
import { CommonOption } from "../../types/biz/option";
import { OptionFormProps } from "../type";
import css from "./index.module.less";
import ColorListPicker from "../../base/ColorListPicker";

const CommonOptionForm  = ({ data, edit }: Omit<OptionFormProps<CommonOption>, "remove">) => {
	const onChange = <K extends keyof CommonOption>(key: K, value: CommonOption[K]) => {
		edit({
			...data,
			[key]: value,
		});
	};
	console.log(data.color);
	return (
		<div className={css.container}>
			<FormItem align title="颜色" hash={"color"}>
				<ColorListPicker
					colors={data?.color}
					onChange={(colors) => {
						onChange("color", colors);
					}}
				/>
			</FormItem>
		</div>
	);
};

export default React.memo(CommonOptionForm);