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
									onMouseDown={() => {
										onChange([...data, { _key: uniqueId(), name: o.val, type: o.code }]);
									}}
									role="button"
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
							key={o._key}
							className={css.selectItem}
							onMouseDown={() => {
								onChange(data.filter(item => item._key !== o._key));
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

export default React.memo(ChartSelector);