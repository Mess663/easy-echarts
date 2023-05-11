import { PluginProps, ToolPlugin } from "../type";
import ToolBtn from "../../components/ToolBtn";
import IconSvg from "../../../../base/IconSvg";
import Popover from "../../../../base/Popover";
import css from "./index.module.less";
import Input from "../../../../base/Input";
import { isNumber } from "lodash";
import { CSSProperties } from "react";

const toRichStyle = (lineHeight: CSSProperties["lineHeight"]): number | undefined => {
	if (!lineHeight) return undefined;
	return isNumber(lineHeight) ? lineHeight : Number(lineHeight?.replace("px", ""));
};

const LineHeight: ToolPlugin = ({ marks, editor }: PluginProps) => {
	return (
		<Popover
			panel={(
				<div className={css.panel}>
					自定义：
					<Input
						value={toRichStyle(marks?.lineHeight) || ""}
						type="number"
						onMouseDown={(e) => { e.stopPropagation(); }}
						className={css.input}
						onChange={(e) => {
							const value = Number(e.target.value);
							if (isNaN(value)) {
								return;
							}
							editor.addMark("lineHeight", value + "px");
						}}
					/>
					<span className={css.px}>px</span>
				</div>
			)}
		>
			<ToolBtn title="行高">
				<IconSvg name="icon-move-vertical" />
			</ToolBtn>
		</Popover>
	);
};

LineHeight.toRichStyle = (cssStyle) => {
	const lineHeight = toRichStyle(cssStyle.lineHeight);
	return {
		...cssStyle,
		lineHeight,
	};
};

export default LineHeight;