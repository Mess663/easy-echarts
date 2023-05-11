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
										// 没有名字默认取图表名
										onChange({ name: o.val.name, ...data, type: o.code });
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