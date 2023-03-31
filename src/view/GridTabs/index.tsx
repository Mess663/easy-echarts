import { Button } from "antd";
import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";
import css from "./index.module.less";

const GridTabs = () => {
	const grid = useSelector((state: RootState) => state.options.grid);
	const selectedId = useSelector(
		(state: RootState) => state.optionView.grid.selectedId ?? state.options.grid[0].id
	);
	const dispatch = useDispatch<Dispatch>();
	return (
		<div className={css.container}>
			<Button
				type="primary"
				onClick={() => {
					dispatch.options.addGrid();
				}}
			>添加</Button>
			{
				grid.map((item, i) => {
					return (
						<Button
							key={item.id}
							className={classNames(css.item, {
								[css.selected]: item.id === selectedId
							})}
							onClick={() => {
								if (item.id === selectedId) return;
								dispatch.optionView.selectGrid(item.id);
							}}
						>
							布局{i + 1}
							<span
								className={css.delete}
								onClick={(e) => {
									e.stopPropagation();
									const restGrid = grid.filter(o => o.id !== item.id);
									dispatch.options.removeGrid(item.id);
									dispatch.optionView.selectGrid(restGrid[0].id);
								}}
							>X</span>
						</Button>
					);
				})
			}
		</div>
	);
};

export default GridTabs;