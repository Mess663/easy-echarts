import { useSlate } from "slate-react";
import { Transforms, Text, Range, Editor } from "slate";
import css from "./index.module.less";
import { cloneDeep, transform } from "lodash";

const ToolBar = () => {
	const editor = useSlate();
	return (
		<div className={css.container}>
			<button
				onMouseDown={() => {
					// Editor.addMark(editor, "fontWeight", "bold");
					// Transforms.setNodes(
					// 	editor,
					// 	{ style: { color: "red" } },
					// 	{
					// 		match: n => Text.isText(n),
					// 		split: true,
					// 		hanging: true,
					// 	}
					// );
					editor.addMark("display", "inline-block");
				}}
			>code</button>
			<button
				onClick={() => {
					const range = Range.edges(editor.selection as Range);
					Transforms.select(editor, {
						anchor: Editor.start(editor, range[0]),
						focus: Editor.end(editor, range[1]),
					});
				}}
			>sele</button>
		</div>
	);
};

export default ToolBar;