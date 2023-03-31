import React from "react";
import FormItem from "../../base/FormItem";
import ChartSelector from "../../components/ChartSelector";
import { Series } from "../../types/biz/option";
import { OptionFormProps } from "../type";
import css from "./index.module.less";

const SeriesForm  = ({ data, edit }: OptionFormProps<Series>) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const hash = "series-" + data.type + ".type" as any; // 这个hash格式特殊，所以any糊弄一下
	return (
		<div className={css.container}>
			<FormItem align title="图形类型：" hash={hash}>
				<ChartSelector data={data} onChange={edit} />
			</FormItem>
		</div>
	);
};

export default SeriesForm;