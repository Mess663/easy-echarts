import React from "react";
import css from "./index.module.less";
import { Button, Space } from "antd";
import ColorPicker from "../ColorPicker";

interface Props {
	colors?: echarts.Color[]
	onChange(colors: echarts.Color[]): void
}

const ColorListPicker = ({ colors = [], onChange }: Props) => {
	return (
		<Space>
			{
				colors.map((c, i) => {
					return (
						<ColorPicker
							color={c as string}
							key={i}
							onChange={(color) => {
								const newColor = [...colors];
								newColor[i] = color.hex;
								onChange(newColor);
							}}
						/>
					);
				})
			}
			<Button
				onClick={() => {
					onChange([...colors, "transparent"]);
				}}
			>添加</Button>
		</Space>
	)
	;
};

export default ColorListPicker;