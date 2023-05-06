import React from "react";
import css from "./index.module.less";
import { OptionFormProps } from "../type";
import { XAxis, YAxis } from "../../types/biz/option";
import FormItem from "../../base/FormItem";
import { Dropdown, Select, Switch } from "antd";
import { AxisPosition } from "../../config/axis";

const positionMenu = [
	{ value: AxisPosition.top, label: AxisPosition.top },
	{ value: AxisPosition.bottom, label: AxisPosition.bottom },
];

const AxisForm = <T extends (XAxis | YAxis)>({ data, edit }: OptionFormProps<T>) => {
	const onChange = (newData: Partial<XAxis>) => {
		edit({ ...data, ...newData });
	};
	return (
		<div className={css.container}>
			<FormItem align title={"是否展示"} hash="xAxis.show">
				<Switch
					checked={data.show ?? true}
					onChange={(show) => {
						onChange({ show });
					}}
				/>
			</FormItem>

			<FormItem align title={"轴的位置"} hash="xAxis.position">
				<Select
					defaultValue={AxisPosition.bottom}
					value={data.position ?? AxisPosition.bottom}
					options={positionMenu}
					onChange={(position) => {
						onChange({ position });
					}}
					style={{ width: 90 }}
				/>
			</FormItem>
		</div>
	);
};

export default AxisForm;