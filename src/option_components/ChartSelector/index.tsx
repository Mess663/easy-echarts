import React from "react";
import css from "./index.module.less";
import { Menu } from "@headlessui/react";
import { ChartEnumify } from "../../types/biz/chart";
import { uniqueId } from "lodash";
import { FormChart } from "../../types/biz/option_form";

interface Props {
	data: FormChart[]
	onChange: (d: Props["data"]) => void
}

const ChartSelector = ({ data, onChange }: Props) => {
	return (
		<>
			<Menu>
				<Menu.Button className={css.btn}>添加图表</Menu.Button>
				<Menu.Items className={css.menuWrap}>
					{
						ChartEnumify.$map(o => (
							<Menu.Item key={o.code}>
								<div 
									className={css.menuItem} 
									onClick={() => {
										onChange([...data, { key: uniqueId(), name: o.val }]);
									}}
								>{o.val}</div>
							</Menu.Item>
						))
					}
				</Menu.Items>
			</Menu>

			<div className={css.select}>
				{
					data.map(o => (
						<div 
							key={o.key} 
							className={css.selectItem}
							onClick={() => {
								onChange(data.filter(item => item.key !== o.key));
							}}
						>
							{o.name}
						</div>
					))
				}
			</div>
		</>
	);
};

export default ChartSelector;