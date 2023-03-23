import React from "react";
import css from "./index.module.less";
import OptionsBar from "../../components/OptionsBar";
import { OptionFormProps } from "../type";
import { XAxis } from "../../types/biz/option_form";
import FormItem from "../../base/FormItem";
import { Switch } from "antd";

const XAxisForm = ({ indexObj, remove, data, edit }: OptionFormProps<XAxis>) => {
	const onRemove = () => remove(data._key);
	const onChange = (newData: Partial<XAxis>) => {
		edit({ ...data, ...newData });
	};
	return (
		<div className={css.container}>
			<OptionsBar
				remove={indexObj.length > 1 ? onRemove : undefined}
				tips={`预览区点击标题可编辑：${indexObj.index}/${indexObj.length}`}
			/>

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

export default XAxisForm;