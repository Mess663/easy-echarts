import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import css from "./index.module.less";

const GridTabs = () => {
	const grid = useSelector((state: RootState) => state.options.grid);
	const dispatch = useDispatch<Dispatch>();
	return (
		<div className={css.container}>
			<Button type="primary">添加</Button>
			{
				grid.map((item, i) => {
					return (
						<Button
							key={item.id}
							className={css.item}
						>
							布局{i + 1}
						</Button>
					);
				})
			}
		</div>
	);
};

export default GridTabs;