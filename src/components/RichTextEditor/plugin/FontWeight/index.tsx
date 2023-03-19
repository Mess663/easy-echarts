import React from "react";
import icon from "../../icon/bold.svg";
import { Editor } from "slate";
import { PluginProps } from "../type";
import ToolBtn from "../../components/ToolBtn";

const FontWeight = ({ marks, editor }: PluginProps) => {
	const isActive = marks?.fontWeight === "bold";
	return (
		<ToolBtn
			isActive={isActive}
			onClick={() => {
				if (isActive) {
					Editor.removeMark(editor, "fontWeight");
				}
				else {
					Editor.addMark(editor, "fontWeight", "bold");
				}
			}}
			icon={icon}
		/>
	);
};

export default FontWeight ;