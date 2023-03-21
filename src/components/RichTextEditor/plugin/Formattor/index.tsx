import ToolBtn from "../../components/ToolBtn";
import IconSvg from "../../../../base/IconSvg";
import { PluginProps } from "../type";
import { keys } from "../../../../tools/type";

const Formattor = ({ marks, editor }: PluginProps) => {
	return (
		<ToolBtn
			title="格式化"
			onMouseDown={() => {
				if (marks) {
					editor.removeMark(keys(marks));
				}
			}}
		>
			<IconSvg name="icon-clean" />
		</ToolBtn>
	);
};

export default Formattor;