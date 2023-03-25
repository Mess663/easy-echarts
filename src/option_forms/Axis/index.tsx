import React from "react";
import css from "./index.module.less";
import { OptionFormProps } from "../type";
import { XAxis, YAxis } from "../../types/biz/option_form";
import FormItem from "../../base/FormItem";
import { Switch } from "antd";

const AxisForm = <T extends (XAxis | YAxis)>({ data, edit }: OptionFormProps<T>) => {
	const onChange = (newData: Partial<XAxis>) => {
		edit({ ...data, ...newData });
	};
	return (
		<div className={css.container}>
			<FormItem align title={"是否展示"} hash="xAxis.show">
				<Switch
					checked={data.show ?? true}
					onChange={(flag) => {
						onChange({ show: flag });
					}}
				/>
			</FormItem>
		</div>
	);
};

export default AxisForm;