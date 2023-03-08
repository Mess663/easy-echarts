import React, { useState } from "react";
import css from "./index.module.less";
import { Menu } from "@headlessui/react";
import { ChartEnumify } from "../../types/biz/chart";
import { uniqueId } from "lodash";

const ChartSelector = () => {
	const [selected, setSelected] = useState<{key: string, val: string}[]>([]);
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
										setSelected(old => [...old, {key: uniqueId(), val: o.val}]);
									}}
								>{o.val}</div>
							</Menu.Item>
						))
					}
				</Menu.Items>
			</Menu>

			<div className={css.select}>
				{
					selected.map(o => (
						<div 
							key={o.key} 
							className={css.selectItem}
							onClick={() => {
								setSelected(old => old.filter(item => item.key !== o.key));
							}}
						>
							{o.val}
						</div>
					))
				}
			</div>
		</>
	);
};

export default ChartSelector;