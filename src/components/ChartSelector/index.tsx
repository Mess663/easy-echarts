import React from "react";
import css from "./index.module.less";
import { Menu } from "@headlessui/react";
import { ChartEnumify } from "../../types/biz/chart";
import { Series } from "../../types/biz/option";

interface Props {
	data: Series
	onChange: (d: Series) => void
}

const ChartSelector = ({ data, onChange }: Props) => {
	return (
		<>
			<Menu>
				<Menu.Button className={css.btn}>{ChartEnumify.$getEnumVal(data.type || ChartEnumify.Line.code).name}</Menu.Button>
				<Menu.Items className={css.menuWrap}>
					{
						ChartEnumify.$map(o => (
							<Menu.Item key={o.code}>
								<div
									className={css.menuItem}
									onMouseDown={() => {
										onChange({ ...data, type: o.code } as Series);
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