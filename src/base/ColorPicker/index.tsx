import React from "react";
import { ColorResult, SketchPicker } from "react-color";
import Popover from "../Popover";
import css from "./index.module.less";

const ColorPicker = ({ color, onChange }: {color?: string, onChange: (c: ColorResult) => void}) => {
	return (
		<Popover
			panel={(
				<SketchPicker
					color={color}
					onChange={(e) => {
						onChange(e);
					}}
				/>
			)}
		>
			<div className={css.color} style={{ backgroundColor: color }} />
		</Popover>
	);
};

export default ColorPicker;