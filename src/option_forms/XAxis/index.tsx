import React from "react";
import css from "./index.module.less";
import OptionsBar from "../../components/OptionsBar";
import { OptionFormProps } from "../type";
import { XAxis } from "../../types/biz/option_form";

const XAxisForm = ({ indexObj, remove, data }: OptionFormProps<XAxis>) => {
	const onRemove = () => remove(data._key);
	return (
		<div className={css.container}>
			<OptionsBar
				remove={indexObj.length > 1 ? onRemove : undefined}
				tips={`预览区点击标题可编辑：${indexObj.index}/${indexObj.length}`}
			/>
		</div>
	);
};

export default XAxisForm;