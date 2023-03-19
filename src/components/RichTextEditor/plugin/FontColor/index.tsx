import IconSvg from "../../../../base/IconSvg";
import ToolBtn from "../../components/ToolBtn";
import { PluginProps } from "../type";
import { SketchPicker } from "react-color";
import css from "./index.module.less";
import { Popover } from "@headlessui/react";

const FontColor = ({ marks, editor }: PluginProps) => {
	return (
		<Popover className={css.container}>
			<Popover.Button className={css.resetBtn}>
				<ToolBtn>
					<IconSvg color={marks?.color} fontSize={18} name='icon-font-color' />
				</ToolBtn>
			</Popover.Button>

			<Popover.Panel className={css.panel}>
				<SketchPicker
					color={marks?.color}
					onChange={(e) => {
						editor.addMark("color", e.hex);
					}}
				/>
			</Popover.Panel>
		</Popover>
	)
	;
};

export default FontColor;