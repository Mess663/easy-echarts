import React, { CSSProperties } from "react";
import IconSvg from "../../../../base/IconSvg";
import { PluginProps } from "../../plugin/type";
import ToolBtn from "../ToolBtn";

interface Props<T extends keyof CSSProperties> extends PluginProps {
	styleKey: T,
	value: CSSProperties[T],
	icon: string,
}

const ToggleBtn = <T extends keyof CSSProperties>({
	marks, editor, styleKey, value, icon,
}: Props<T>) => {
	const isActive = marks?.[styleKey] === value;
	return (
		<ToolBtn
			isActive={isActive}
			onClick={() => {
				if (isActive) {
					editor.removeMark(styleKey);
				}
				else {
					editor.addMark(styleKey, value);
				}
			}}
		>
			<IconSvg fontSize={18} name={icon} />
		</ToolBtn>
	);
};

export default ToggleBtn;