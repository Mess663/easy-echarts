import { PluginProps } from "../type";
import ToolBtn from "../../components/ToolBtn";
import IconSvg from "../../../../base/IconSvg";
import Popover from "../../../../base/Popover";
import css from "./index.module.less";
import Input from "../../../../base/Input";
import { isNumber } from "lodash";

const LineHeight = ({ marks, editor }: PluginProps) => {
	console.log(Number(marks?.lineHeight));
	const val = isNumber(marks?.lineHeight) ? marks?.lineHeight : marks?.lineHeight?.replace("px", "");
	return (
		<Popover
			panel={(
				<div className={css.panel}>
					自定义：
					<Input
						value={val}
						type="number"
						onMouseDown={(e) => { e.stopPropagation(); }}
						className={css.input}
						onChange={(e) => {
							const value = Number(e.target.value);
							console.log(value);
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

export default LineHeight;