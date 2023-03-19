import React from "react";
import { Editor } from "slate";
import { PluginProps } from "../type";
import ToolBtn from "../../components/ToolBtn";
import IconSvg from "../../../../base/IconSvg";

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
		>
			<IconSvg fontSize={18} name='icon-bold' />
		</ToolBtn>
	);
};

export default FontWeight ;