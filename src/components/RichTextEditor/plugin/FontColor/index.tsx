import IconSvg from "../../../../base/IconSvg";
import ToolBtn from "../../components/ToolBtn";
import { PluginProps } from "../type";
import { SketchPicker } from "react-color";
import Popover from "../../../../base/Popover";

const FontColor = ({ marks, editor }: PluginProps) => {
	return (
		<Popover
			panel={(
				<SketchPicker
					color={marks?.color}
					onChange={(e) => {
						editor.addMark("color", e.hex);
					}}
				/>
			)}
		>
			<ToolBtn title="字体颜色">
				<IconSvg color={marks?.color} fontSize={18} name='icon-font-color' />
			</ToolBtn>
		</Popover>
	);
};

export default FontColor;