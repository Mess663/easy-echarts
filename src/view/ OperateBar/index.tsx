import React from "react";
import css from "./index.module.less";
import { Input, Space, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";

const  OperateBar = () => {
	const dispatch = useDispatch<Dispatch>();
	const { gridMode, dataCount } = useSelector((state: RootState) => state.ui);
	return (
		<Space>
			<div>
			布局模式：<Switch checked={gridMode} onChange={(f) => dispatch.ui.setGridMode(f)} />
			</div>
			<div className={css.dataCount}>
				数据量：2
				<Input
					type="range"
					min={2}
					max={20}
					value={dataCount}
					onChange={(e) => {
						const n = Number(e.target.value);
						dispatch.ui.setDataCount(n);
						dispatch.options.updateDataCount(n);
					}}
				/>
				50
			</div>
		</Space>
	);
};

export default  OperateBar;