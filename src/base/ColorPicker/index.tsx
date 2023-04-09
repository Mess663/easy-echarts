import React from "react";
import { ColorResult, SketchPicker } from "react-color";
import css from "./index.module.less";
import { Popover } from "antd";

const ColorPicker = ({ color, onChange }: {color?: string, onChange: (c: ColorResult) => void}) => {
	return (
		<Popover
			content={(
				<SketchPicker
					color={color}
					className={css.colorPicker}
					onChange={(e) => {
						onChange(e);
					}}
				/>
			)}
			overlayInnerStyle={{
				padding: 0
			}}
			trigger={"click"}
		>
			<div className={css.color} style={{ backgroundColor: color }} />
		</Popover>
	);
};

export default ColorPicker;