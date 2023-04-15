import React from "react";
import css from "./index.module.less";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../models";

const  OperateBar = () => {
	const dispatch = useDispatch<Dispatch>();
	const gridMode = useSelector((state: RootState) => state.ui.gridMode);
	return (
		<div>
			布局模式：<Switch checked={gridMode} onChange={(f) => dispatch.ui.setGridMode(f)} />
		</div>
	);
};

export default  OperateBar;