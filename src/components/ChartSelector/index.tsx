import React from "react";
import css from "./index.module.less";
import { Menu } from "@headlessui/react";
import { ChartEnumify } from "../../types/biz/chart";
import { uniqueId } from "lodash";
import { Series } from "../../types/biz/option";

interface Props {
	data: Series
	onChange: (d: Props["data"]) => void
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
										onChange({ ...data, name: o.val.name, type: o.code });
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