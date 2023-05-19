import React from "react";
import css from "./index.module.less";
import { Menu } from "@headlessui/react";
import { Chart, ChartEnumify } from "../../types/biz/chart";

interface Props {
	data: Chart
	onChange: (type: Chart) => void
}

const ChartSelector = ({ data, onChange }: Props) => {
	return (
		<>
			<Menu>
				<Menu.Button className={css.btn}>{ChartEnumify.$getEnumVal(data || ChartEnumify.Line.code).name}</Menu.Button>
				<Menu.Items className={css.menuWrap}>
					{
						ChartEnumify.$map(o => (
							<Menu.Item key={o.code}>
								<div
									className={css.menuItem}
									onMouseDown={() => {
										onChange(o.code);
									}}
									role="button"
								>{o.val.name}</div>
							</Menu.Item>
						))
					}
				</Menu.Items>
			</Menu>
		</>
	);
};

export default ChartSelector;